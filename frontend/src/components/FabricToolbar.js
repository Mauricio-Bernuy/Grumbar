import React, { useContext, useEffect } from "react";
import { FabricContext } from "./../context/FabricContext";
import FabricImage from "./objects/FabricImage";
import FabricTextBox from "./objects/FabricTextBox";
import FabricAsset from "./objects/FabricAsset";
import FabricRoom from "./objects/FabricRoom";
import FabricExportLoad from "./objects/FabricExportLoad";
import FabricGrid from "./objects/FabricGrid";

// const FabricToolbar = props => {
//     const { canvas } = useContext(FabricContext)

//     const removeObjects = () => {
//         canvas.getActiveObjects().forEach((obj) => {
//             canvas.remove(obj)
//         })
//         canvas.discardActiveObject().renderAll()
//     }
//     return (
//         <>
//             <FabricTextBox/>
//             {/* <FabricLine/> */}
//             <FabricImage/>
//             <FabricAsset/>
//             <button onClick={removeObjects}>
//                 Delete Selected
//             </button>
//             <hr/>
// 			<FabricRoom/>
//             <FabricExportLoad/>
//             <FabricGrid/>
//         </>
//     )
// }

// export default FabricToolbar

import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MuiDrawer from "@mui/material/Drawer";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ChairIcon from "@mui/icons-material/Chair";
import PolylineIcon from "@mui/icons-material/Polyline";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";

import TitlebarImageList from "./assetGallery";
import { Stack } from "@mui/material";

const FabricToolbar = (props) => {
  const [open, setOpen] = React.useState(true);

  const [assetOpen, setAssetOpen] = React.useState(false);

  const toggleDrawer = (value) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      // console.log("owo")
      return;
    }

    setAssetOpen(value);
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

  const drawerWidth = 240;

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const roomButtonRef = React.useRef();
  function handleClick() {
    setAnchorEl(roomButtonRef.current);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  useEffect(() => {
    setAnchorEl(roomButtonRef.current);
  }, [roomButtonRef]);

  return (
    <>
      {/* toolbar drawer */}

      <Drawer variant="permanent" open={false}>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            justifyContent: "center",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListSubheader component="div" id="nested-list-subheader">
            Tools
          </ListSubheader>

          {/* Asset Tool*/}
          <HtmlTooltip
            title={
              <React.Fragment>
                <Typography color="inherit">Asset Gallery</Typography>
                <em>{"Click to open the asset selection menu"}</em>
              </React.Fragment>
            }
          >
            <ListItemButton onClick={toggleDrawer(true)}>
              <ListItemIcon>
                <ChairIcon />
              </ListItemIcon>
              <ListItemText primary="Assets" />
            </ListItemButton>
          </HtmlTooltip>

          <FabricAsset />

          {/* Room Tool  */}

          <FabricRoom />

          {/* tool 3  */}

          <FabricTextBox />

          <Divider />

          <FabricExportLoad />

          {/* <FabricImage /> */}
        </List>
        <FabricGrid />
      </Drawer>

      {/* asset drawer */}

      <MuiDrawer
        variant="temporary"
        open={assetOpen}
        onClose={toggleDrawer(false)}
        BackdropProps={{ invisible: true }}
      >
        <Box
          sx={{ width: "auto" }}
          role="presentation"
          // onClick={toggleDrawer( false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List
            sx={{ width: 360, maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={0}
                >
              <ListSubheader component="div" id="nested-list-subheader">
                Asset Selection
                  <IconButton onClick={toggleDrawer(false)}>
                    {theme.direction === "rtl" ? (
                      <ChevronRightIcon />
                    ) : (
                      <ChevronLeftIcon />
                    )}
                  </IconButton>

              </ListSubheader>
                  <FabricImage/>
                </Stack>
            }
          >
            <TitlebarImageList type="userAssets" setAssetOpen={setAssetOpen} />
            <TitlebarImageList name="Category 2" setAssetOpen={setAssetOpen} />
            <TitlebarImageList name="Category 3" setAssetOpen={setAssetOpen} />
          </List>
        </Box>
      </MuiDrawer>
    </>
  );
};
export default FabricToolbar;
