import React, { useState, useContext, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../../context/FabricContext";
import { getActiveStyle, setActiveStyle } from "../libs/utils";

import testfloor from "../../assets/floor textures/Rock Tiles A.jpg";

// MATERIAL UI
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PolylineIcon from "@mui/icons-material/Polyline";
import { styled, useTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import Popper from "@mui/material/Popper";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FabricRoom = () => {
  const {
    canvas,
    activeObject,
    prevGrid,
    layerLevel,
    removeObjects,
  } = useContext(FabricContext);
  
  const [showTools, setShowTools] = useState(false);
  const [options, setOptions] = useState({
    selectable: false,
    strokeWidth: 1,
    hasControls: false,
    lockMovementX: true,
    lockMovementY: true,
    lockSkewingX: true,
    lockSkewingY: true,
  });

  useEffect(() => {
    setShowTools(
      activeObject ? activeObject.get("type") === "polyline" : false
    );
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

  const updateStrokeWidth = (e) => {
    setOptions({
      ...options,
      strokeWidth: e.target.value,
    });
    setActiveStyle("strokeWidth", parseInt(e.target.value, 10), activeObject);
  };

  const toggleLockMovement = (e) => {
    setOptions({
      ...options,
    });
    setActiveStyle(
      "selectable",
      !getActiveStyle("selectable", activeObject),
      activeObject
    );
    setActiveStyle(
      "hasControls",
      !getActiveStyle("hasControls", activeObject),
      activeObject
    );
    setActiveStyle(
      "lockMovementX",
      !getActiveStyle("lockMovementX", activeObject),
      activeObject
    );
    setActiveStyle(
      "lockMovementY",
      !getActiveStyle("lockMovementY", activeObject),
      activeObject
    );
  };
  const bringFw = (e) => {
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
    let layerlevel = Math.min.apply(null, lyrs);

    // let layerlevel = objects.indexOf(prevGrid[prevGrid.length]);
    // console.log(lyrs,Math.min.apply(null, lyrs))

    linelayer = Math.max(linelayer, layerlevel, layerLevel);

    // console.log(l, linelayer)

    if (l < linelayer - 1) activeObject.bringForward();
  };

  const sendBw = (e) => {
    setOptions({
      ...options,
    });

    let objects = canvas.getObjects();
    let l = objects.indexOf(activeObject);
    if (l > 1) activeObject.sendBackwards();
  };

  let coords = [];
  let tempoverlay = [];
  let templines = [];

  const addPolyLine = (e) => {
    coords.pop();
    coords.push(coords[0]);

    const file = testfloor; // Floor asset

    let coordscopy = coords; // using var instead of let in coords may fix this (global ish values?)
    let polyline = null;

    fabric.util.loadImage(
      file,
      function(img) {
        var pattern = new fabric.Pattern({
          repeat: "repeat",
        });
        pattern.source = img;

        pattern.patternTransform = [0.3715, 0, 0, 0.3715, 0, 0];

        polyline = new fabric.Polyline(coordscopy, {
          ...options,
          cornerStyle: "circle",
          fill: pattern,
          stroke: "black",
          dirty: false,
          strokeWidth: 10,
          hoverCursor: "cell",
          // perPixelTargetFind: true,
          objectCaching: false, // greatly increases render resolution
        });
        canvas.add(polyline);

        polyline.sendToBack();

        polyline.bringForward();

        let objects = canvas.getObjects();

        let linelayer = 1;

        let lyrs = [];
        prevGrid.forEach((element) => {
          lyrs.push(objects.indexOf(element));
        });
        lyrs.shift();
        let layerlevel = Math.min.apply(null, lyrs);

        linelayer = Math.max(linelayer, layerlevel, layerLevel);

        polyline.moveTo(linelayer - 1);
        // toggleLockMovement();

        // eslint-disable-next-line no-extra-bind
      }.bind(this),
      {
        crossOrigin: "anonymous",
      }
    );

    canvas.renderAll();
  };

  let lock1 = false;
  var detectionRadius = 20; // px
  const getCoords = (e) => {
		canvas.selection = false;
	  canvas.renderAll()
    canvas.on("mouse:up", function(opt) {  
	  canvas.selection = false;
	  canvas.renderAll()
	  let x, y;
      let pointer = canvas.getPointer(opt.e);
      x = pointer.x;
      y = pointer.y;

      // line drawing
      if (coords.length > 0) {
        let temp = coords[coords.length - 1];
        var line = new fabric.Line([temp.x, temp.y, pointer.x, pointer.y], {
          fill: "red",
          stroke: "red",
          strokeWidth: 5,
          selectable: false,
          evented: false,
        });

        tempoverlay.push(line);
        canvas.add(line);
      }

      // point drawing
      var object = new fabric.Circle({
        radius: 5,
        fill: "blue",
        left: pointer.x - 5,
        top: pointer.y - 5,
        selectable: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
      });

      tempoverlay.push(object);
      canvas.add(object);

      // initial circle
      if (coords.length === 0) {
        var objectPatrol = new fabric.Circle({
          radius: detectionRadius,
          left: pointer.x - detectionRadius,
          top: pointer.y - detectionRadius,
          fill: "rgba(0,0,0,0)",
          hasBorder: true,
          stroke: "black",
          strokeWidth: 2,
          selectable: false,
          hasControls: false,
          lockMovementX: true,
          lockMovementY: true,
        });

        tempoverlay.push(objectPatrol);
        canvas.add(objectPatrol);
      }
      coords.push({ x, y });

      // check if near enough to close the circle

      if (coords.length > 1) {
        console.log("length more than zero");
        if (
          coords[0].x - detectionRadius <= x &&
          x <= coords[0].x + detectionRadius
        ) {
          if (
            coords[0].y - detectionRadius <= y &&
            y <= coords[0].y + detectionRadius
          ) {
            console.log("poly closed");
            let listener = canvas.__eventListeners["mouse:up"];
            let curr = listener[listener.length - 1];

            for (let i = 0; i < tempoverlay.length; i++) {
              canvas.remove(tempoverlay[i]);
            }

            for (let i = 0; i < templines.length; i++) {
              canvas.remove(templines[i]);
            }

            // console.log("listen: ", listener);
            // console.log("curr: ", curr);
            canvas.off("mouse:up", curr);

            lock1 = false;
            addPolyLine();

            coords = [];
            tempoverlay = [];
			
			canvas.selection = true;

          }
        }
      }
    });

  };

  let lock2 = false;
  const clickOnce = (e) => {
    if (lock1 === false) {
      getCoords(e);
      lock1 = true;
    } else console.log("Button already pressed.");

    // mantain a constant wall width and tile scale
    // SHOULD BE OUTSIDE, CREATES A LOT OF INSTANCES APPARENTLY
    if (canvas && !lock2) {
      console.log("ran Once");
      canvas.on("object:scaling", function(e) {
        if (e.target != null) {
          // handle just object
          if (e.target.type === "polyline") {
            var obj = e.target;
            obj.fill.patternTransform = [
              0.3715 / obj.scaleX,
              0,
              0,
              0.3715 / obj.scaleY,
              0,
              0,
            ];
            obj.strokeWidth = 10 / obj.scaleX;
          }
          // handle in group
          else if (e.target._objects) {
            e.target._objects.forEach((element) => {
              if (element.type === "polyline") {
                var obj = element;
                var relativeX = element.scaleX * e.target.scaleX;
                var relativeY = element.scaleY * e.target.scaleY;
                obj.fill.patternTransform = [
                  0.3715 / relativeX,
                  0,
                  0,
                  0.3715 / relativeY,
                  0,
                  0,
                ];
                obj.strokeWidth = 10 / relativeX;
              }
            });
          }
        }
      });
      lock2 = true;
    }
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


  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef]);


  return (
    <>
      <HtmlTooltip 
        title={
          <React.Fragment>
            <Typography color="inherit">Room Tool</Typography>
            <em>{"Click to draw new room"}</em>
          </React.Fragment>
        }
      >
        <ListItemButton
          onClick={() => {
            clickOnce();
          }}

        >
          <ListItemIcon>
            <PolylineIcon />
          </ListItemIcon>

          <ListItemText primary="" />
        </ListItemButton>
      </HtmlTooltip>
		
	  <div ref={divRef}/>
      {showTools && (
        <div>
          <Popper
            style={{
              position:"absolute",
			  paddingLeft: "70px"
            }}
            id={"simple-popper"}
			anchorEl={anchorEl}
            open={true}
          >
            <Paper sx={{ width: 180, maxWidth: "100%" }}>
              <MenuList>
				<MenuItem style={{justifyContent: "center", backgroundColor: 'transparent'}} disableRipple={true}>
					<ListItemText style={{textAlign: "center"}}>
						<Typography variant="h6" style={{ color: '#ff6f00' }}>Room Settings</Typography>
					
					</ListItemText>
				</MenuItem>
					
                <MenuItem
                  onClick={() => {
                    toggleLockMovement();
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
                    L
                  </Typography>
                </MenuItem>

                <MenuItem>
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
                <MenuItem style={{justifyContent: "center", backgroundColor: 'transparent'}} disableRipple={true}>
                  <ListItemText style={{textAlign: "center"}}>
						<Typography variant="h6" style={{ color: 'gray' }}>Layers</Typography>
					
					</ListItemText>
                </MenuItem>
				
                <MenuItem style={{justifyContent: "center", backgroundColor: 'transparent'}} disableRipple={true} >
					<ButtonGroup variant="contained" size="large" className="btngrp" color="primary" style={{display:'contents',
  					justifyContent: "center"}} >
						<Tooltip title="Send Object Backwards" placement="bottom">
							<Button variant="outlined" onClick={sendBw}>
								<KeyboardArrowDownIcon fontSize="small" />
							</Button >
						</Tooltip>
						<Tooltip title="Bring Object Forwards" placement="bottom">
							<Button variant="outlined" color="success" onClick={bringFw}>
								<KeyboardArrowUpIcon fontSize="small" />
							</Button>
						</Tooltip>
					</ButtonGroup>
                </MenuItem>

              </MenuList>
            </Paper>
          </Popper>
        </div>
      )}
    </>
  );
};

export default FabricRoom;
