import React, { useContext, useState } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../../context/FabricContext";

import { useAuth0 } from "@auth0/auth0-react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Stack } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PublishIcon from "@mui/icons-material/Publish";
const supportedImageTypes = [
  "image/png",
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/x-icon",
  "image/jpeg",
];

const FabricImage = (props) => {
  const { user, isAuthenticated } = useAuth0();
  const [open, setOpen] = React.useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event) => {
    console.log(event.target.files);
    setSelectedFile(event.target.files[0]);
  };

  const { canvas } = useContext(FabricContext);

  const onImageUpload = (e) => {
    e.preventDefault();
    if (props.userInput) {
      const formData = new FormData();
      formData.append("asset", selectedFile);
      formData.append("userId", e.target.userId.value);
      formData.append("title", e.target.title.value);
      formData.append("category", e.target.category.value);

      fetch("http://localhost:9000/api/assets/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });

      props.triggerFetch();
    } else {
      const formData = new FormData();
      formData.append("asset", selectedFile);
      formData.append("title", e.target.title.value);
      formData.append("category", e.target.category.value);

      fetch("http://localhost:9000/api/assets/devupload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
        });
      props.triggerFetch();
    }
    setOpen(false);
    return false;
  };

  const theme = useTheme();

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right-end" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  return (
    <>
      <div>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">Upload Assets</Typography>
              <em>{"Upload your own assets to use inside the editor"}</em>
            </React.Fragment>
          }
        >
          <IconButton
            size="small"
            aria-label="add asset"
            onClick={handleClickOpen}
          >
            <PublishIcon />
          </IconButton>
        </HtmlTooltip>

        <form onSubmit={onImageUpload}>
          <Dialog open={open} disablePortal>
            <DialogTitle>
              {props.userInput ? "Upload Assets" : "DEV: ADD ASSET TO DB"}
            </DialogTitle>
            <DialogContent>
              <Stack direction="column" spacing={2} justifyContent="flex-end">
                <hr></hr>
                <TextField
                  required
                  id="outlined-required"
                  label="Title"
                  name="title"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Category"
                  name="category"
                />
                {props.userInput ? (
                  <>
                    <TextField
                      disabled
                      id="outlined"
                      label="userId (optional)"
                      name="userId"
                      defaultValue={user.email}
                    />
                  </>
                ) : (
                  <></>
                )}

                <Button
                  variant="contained"
                  component="label"
                  color={!selectedFile ? "primary" : "success"}
                >
                  {!selectedFile ? "Upload File" : "File Selected!"}

                  <input
                    type="file"
                    name="asset"
                    id="fabric-image-upload"
                    accept="image/*"
                    onChange={changeHandler}
                    style={{ display: "none" }}
                  />
                </Button>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add asset</Button>
            </DialogActions>
          </Dialog>
        </form>
      </div>
    </>
  );
};

export default FabricImage;
