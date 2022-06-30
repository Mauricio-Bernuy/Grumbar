import React, { useState, useContext, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../../context/FabricContext";
import { getActiveStyle, setActiveStyle } from "../libs/utils";
import testasset from "../../TC_Dungeon Delvers Asset Pack_TreasureChest02.png";

import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// MATERIAL UI
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PolylineIcon from "@mui/icons-material/Polyline";
import { styled, useTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";

const FabricAsset = () => {
  const {
    canvas,
    activeObject,
    prevGrid,
    layerLevel,
    removeObjects,
    toggleLock,
    Copy,
  } = useContext(FabricContext);
  const [showTools, setShowTools] = useState(false);
  const [options, setOptions] = useState({
    selectable: true,
    hasControls: true,
    lockMovementX: false,
    lockMovementY: false,
  });

  useEffect(() => {
    setShowTools(activeObject ? activeObject.get("type") === "image" : false);
    if (activeObject) {
      const activeOptions = {
        strokeWidth: getActiveStyle("strokeWidth", activeObject),
        selectable: getActiveStyle("selectable", activeObject),
        hasControls: getActiveStyle("hasControls", activeObject),
        lockMovementX: getActiveStyle("lockMovementX", activeObject),
        lockMovementY: getActiveStyle("lockMovementY", activeObject),
      };
      setOptions({ ...options, ...activeOptions });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject]);

  const bringFw = (e) => {
    setOptions({
      ...options,
    });

    activeObject.bringForward();
  };

  const sendBw = (e) => {
    setOptions({
      ...options,
    });

    let objects = canvas.getObjects();
    let l = objects.indexOf(activeObject);
    let linelayer = 1;
    let lyrs = [];

    prevGrid.forEach((element) => {
      lyrs.push(objects.indexOf(element));
    });
    lyrs.shift();
    let layerlevel = Math.max.apply(null, lyrs);
    // console.log(lyrs,layerlevel)

    linelayer = Math.max(linelayer, layerlevel, layerLevel);

    if (l > linelayer + 1) activeObject.sendBackwards();
  };

  // let lock = false;
  // const addAsset = (e) => {
  //     canvas.on('mouse:up', function(opt) {
  //         const file = testasset;
  //         fabric.Image.fromURL(file, function(img) {
  //             img.scaleToWidth(100);
  //             img.snapAngle=15
  //             let pointer = canvas.getPointer(opt.e);
  //             img.top = pointer.y - img.getScaledHeight()/2;
  //             img.left = pointer.x - img.getScaledWidth()/2;
  //             console.log("pointer: ", pointer);
  //             canvas.add(img);
  //         });
  //         let listener = canvas.__eventListeners['mouse:up'];
  //         let curr = listener[listener.length - 1];

  //         canvas.off('mouse:up', curr);

  //         lock = false;
  //     })
  // };

  // const clickOnce = (e) => {
  //     if (lock === false) {
  //     addAsset(e);
  //     lock = true;
  //     }else
  //     console.log("Button already pressed.");
  // };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef, anchorEl]);

  return (
    <>
      <div
        style={{
          width: "250px",
          marginLeft: "50%",
        }}
        ref={divRef}
      />

      <div>
        {anchorEl && showTools && (
          <Popper id={"simple-popper"} anchorEl={anchorEl} open={true}>
            <Paper sx={{ width: 180, maxWidth: "100%", backgroundColor: 'rgba(255,255,255,0.85)', }}>
              <MenuList>
                <MenuItem
                  style={{
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                  disableRipple={true}
                >
                  <ListItemText style={{ textAlign: "center" }}>
                    <Typography variant="h6" style={{ color: "#ff6f00" }}>
                      Asset Settings
                    </Typography>
                  </ListItemText>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    toggleLock(setOptions, options);
                  }}
                >
                  <ListItemIcon>
                    {getActiveStyle("selectable", activeObject) ? (
                      <LockIcon fontSize="small" />
                    ) : (
                      <LockOpenIcon fontSize="small" />
                    )}
                  </ListItemIcon>
                  <ListItemText>
                    {getActiveStyle("selectable", activeObject)
                      ? "Lock"
                      : "Unlock"}
                  </ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    ctrl+L
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    Copy();
                  }}
                >
                  <ListItemIcon>
                    <ContentCopy fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    ctrl+C
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    removeObjects();
                  }}
                >
                  <ListItemIcon>
                    <ContentPaste fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                  <Typography variant="body2" color="text.secondary">
                    del
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                  style={{
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                  disableRipple={true}
                >
                  <ListItemText style={{ textAlign: "center" }}>
                    <Typography variant="h6" style={{ color: "gray" }}>
                      Layers
                    </Typography>
                  </ListItemText>
                </MenuItem>
                <MenuItem
                  style={{
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                  disableRipple={true}
                >
                  <ButtonGroup
                    variant="contained"
                    size="large"
                    className="btngrp"
                    color="primary"
                    style={{ display: "contents", justifyContent: "center" }}
                  >
                    <Tooltip title="Send Object Backwards" placement="bottom">
                      <Button variant="outlined" onClick={sendBw}>
                        <KeyboardArrowDownIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Bring Object Forwards" placement="bottom">
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={bringFw}
                      >
                        <KeyboardArrowUpIcon fontSize="small" />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </MenuItem>
              </MenuList>
            </Paper>
          </Popper>
        )}
      </div>
    </>
  );
};

export default FabricAsset;
