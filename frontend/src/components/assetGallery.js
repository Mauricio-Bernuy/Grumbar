import React, { useState, useContext, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { fabric } from "fabric";
import { FabricContext } from "../context/FabricContext";
import { useAuth0 } from "@auth0/auth0-react";

export default function TitlebarImageList(props) {
  const { user, isLoading, isAuthenticated } = useAuth0();

  const [open, setOpen] = React.useState(false);
  const [fetchData, setFetchData] = React.useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  const { canvas, activeObject, prevGrid, layerLevel } =
    useContext(FabricContext);

  useEffect(() => {
    if (isAuthenticated) {
      if (props.type === "userAssets") {
        const formData = new FormData();
        formData.append("userId", user.email);
        console.log(formData);

        fetch("http://localhost:9000/api/assets/personal", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((json) => setFetchData(json))
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        const formData = new FormData();
        formData.append("category", props.category);
        console.log(formData);

        fetch("http://localhost:9000/api/assets/common", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((json) => setFetchData(json))
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      // all assets
      // fetch('http://localhost:9000/api/assets')
      // .then((response) => response.json())
      // .then(json => setFetchData(json))
    }
    // console.log(fetchData)
  }, [props.fetchFlag]);

  let lock = false;
  const addAsset = (e) => {
    canvas.on("mouse:up", function (opt) {
      const file = e.url;
      fabric.Image.fromURL(file, function (img) {
        img.scaleToWidth(100);
        img.snapAngle = 15;
        let pointer = canvas.getPointer(opt.e);
        img.top = pointer.y - img.getScaledHeight() / 2;
        img.left = pointer.x - img.getScaledWidth() / 2;
        console.log("pointer: ", pointer);
        canvas.add(img);
      });
      let listener = canvas.__eventListeners["mouse:up"];
      let curr = listener[listener.length - 1];

      canvas.off("mouse:up", curr);

      lock = false;
    });
  };

  const clickOnce = (e) => {
    console.log(e);
    if (lock === false) {
      addAsset(e);
      lock = true;
    } else console.log("Button already pressed.");
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.category} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open}>
        <ImageList>
          {fetchData.map((item) => (
            <ImageListItem key={item.url}>
              <img
                src={`${item.url}?w=248&fit=crop&auto=format`}
                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.category}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                    onClick={() => {
                      clickOnce(item);
                      console.log("adding asset:", item.title);
                      props.setAssetOpen(false);
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Collapse>
    </>
  );
}
