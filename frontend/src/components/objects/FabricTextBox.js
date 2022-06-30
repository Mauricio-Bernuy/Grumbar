import React, { useState, useContext, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../../context/FabricContext";
import { getActiveStyle, setActiveProp, setActiveStyle } from "../libs/utils";

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

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TextField from "@mui/material/TextField";

const FabricTextBox = () => {
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
  const [textOptions, setTextOptions] = useState({
    width: 200,
    top: 10,
    left: 10,
    fontSize: 24,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left",
    fontFamily: "arial",
    textDecoration: "normal",
    fill: "#000000",
    shadow: 0,
  });
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    setShowTools(activeObject ? activeObject.get("type") === "textbox" : false);
    if (activeObject) {
      const activeOptions = {
        fontSize: getActiveStyle("fontSize", activeObject),
        fontWeight: getActiveStyle("fontWeight", activeObject),
        fontStyle: getActiveStyle("fontStyle", activeObject),
        textAlign: getActiveStyle("textAlign", activeObject),
        fontFamily: getActiveStyle("fontFamily", activeObject),
        textDecoration: getActiveStyle("textDecoration", activeObject),
        fill: getActiveStyle("fill", activeObject),
        selectable: getActiveStyle("selectable", activeObject),
        hasControls: getActiveStyle("hasControls", activeObject),
        lockMovementX: getActiveStyle("lockMovementX", activeObject),
        lockMovementY: getActiveStyle("lockMovementY", activeObject),
        shadow: getActiveStyle("shadow", activeObject),
      };
      setTextOptions({ ...textOptions, ...activeOptions });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeObject]);

  const bringFw = (e) => {
    setTextOptions({
      ...textOptions,
    });

    activeObject.bringForward();
  };

  const sendBw = (e) => {
    setTextOptions({
      ...textOptions,
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

  let lock = false;
  const addTextBox = (e) => {
    canvas.on("mouse:up", function(opt) {
      let textBox = new fabric.Textbox("Add your text here", {
        width: 200,
        top: 10,
        left: 10,
        fontSize: 24,
        fontWeight: "normal",
        fontStyle: "normal",
        textAlign: "left",
        // fontFamily: "arial",
        fontFamily: "Calibri",
        textDecoration: "normal",
        fill: "#000000",
      });

      let pointer = canvas.getPointer(opt.e);
      textBox.top = pointer.y - textBox.getScaledHeight() / 2;
      textBox.left = pointer.x - textBox.getScaledWidth() / 2;
      console.log("pointer: ", pointer);

      let listener = canvas.__eventListeners["mouse:up"];
      let curr = listener[listener.length - 1];

      console.log("listen: ", listener);
      console.log("curr: ", curr);
      canvas.off("mouse:up", curr);
      canvas.add(textBox);
      lock = false;
    });
  };

  const toggleShadow = (e) => {
    if (hasShadow) {
      setTextOptions({
        ...textOptions,
        shadow: 0,
      });
      setActiveStyle("shadow", 0, activeObject);
    } else {
      let shad = "rgba(0,0,0,0.3) 1px 1px 1px";
      setTextOptions({
        ...textOptions,
        shadow: shad,
      });
      setActiveStyle("shadow", shad, activeObject);
    }
    setHasShadow(!hasShadow);
  };

  const updateFontSize = (e) => {
    setTextOptions({
      ...textOptions,
      fontSize: e.target.value,
    });
    setActiveStyle("fontSize", parseInt(e.target.value, 10), activeObject);
  };

  const updateFill = (e) => {
    setTextOptions({
      ...textOptions,
      fill: e.target.value,
    });
    setActiveProp("fill", e.target.value, activeObject);
  };

  const updateTextAlign = (e) => {
    setTextOptions({
      ...textOptions,
      textAlign: e.currentTarget.value,
    });
    setActiveStyle(
      "textAlign",
      e.currentTarget.value.toLowerCase(),
      activeObject
    );
  };

  const updateBold = (e) => {
    const value = textOptions.fontWeight === "bold" ? "normal" : "bold";
    setTextOptions({
      ...textOptions,
      fontWeight: value,
    });
    setActiveStyle("fontWeight", value, activeObject);
  };

  const updateItalic = (e) => {
    const value = textOptions.fontStyle === "italic" ? "normal" : "italic";
    setTextOptions({
      ...textOptions,
      fontStyle: value,
    });
    setActiveStyle("fontStyle", value, activeObject);
  };

  const updateUnderline = (e) => {
    const value = textOptions.textDecoration === "underline" ? "" : "underline";

    setTextOptions({
      ...textOptions,
      textDecoration: value,
    });
    setActiveStyle("textDecoration", value, activeObject);
    setActiveStyle("underline", !!value.length, activeObject);
  };

  const clickOnce = (e) => {
    if (lock === false) {
      addTextBox(e);
      lock = true;
    } else console.log("Button already pressed.");
  };

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
            <Typography color="inherit">Text Tool</Typography>
            <em>{"Click to create new text item"}</em>
          </React.Fragment>
        }
      >
        <ListItemButton
          onClick={() => {
            clickOnce();
          }}
        >
          <ListItemIcon>
            <TextFieldsIcon />
          </ListItemIcon>
          <ListItemText primary="Room" />
        </ListItemButton>
      </HtmlTooltip>

      <div ref={divRef} />
      {showTools && (
        <div>
          <Popper
            style={{
              position: "absolute",
              paddingLeft: "70px",
            }}
            id={"simple-popper"}
            anchorEl={anchorEl}
            open={true}
          >
            <Paper sx={{ width: 180, maxWidth: "100%", backgroundColor: 'rgba(255,255,255,0.85)',  }}>
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
                      Text Settings
                    </Typography>
                  </ListItemText>
                </MenuItem>

                <TextField
                  type="number"
                  name="totalBill"
                  label="Font Size"
                  variant="filled"
                  value={textOptions.fontSize}
                  onChange={updateFontSize}
                />
                <TextField
                  type="color"
                  name="totalBill"
                  label="Color"
                  variant="filled"
                  value={textOptions.fill}
                  onChange={updateFill}
                />
                <select
                  name="textAlign"
                  className="btn-object-action"
                  onChange={updateTextAlign}
                  value={textOptions.textAlign}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>

                <div id="text-controls-additional">
                  <button
                    type="button"
                    style={{
                      background:
                        textOptions.fontWeight === "bold" ? "white" : "gray",
                    }}
                    onMouseUp={updateBold}
                    className="btn btn-object-action"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    style={{
                      background:
                        textOptions.fontStyle === "italic" ? "white" : "gray",
                    }}
                    onMouseUp={updateItalic}
                    className="btn btn-object-action"
                    id="text-cmd-italic"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    style={{
                      background:
                        textOptions.textDecoration === "underline"
                          ? "white"
                          : "gray",
                    }}
                    onMouseUp={updateUnderline}
                    className="btn btn-object-action"
                    id="text-cmd-underline"
                  >
                    <u>U</u>
                  </button>
                </div>

                <label htmlFor="ToggleShadow">Toggle Shadow:</label>
                <input
                  type="checkbox"
                  style={{ width: "40px" }}
                  className="toggle-switch-checkbox"
                  name="strokeWidth"
                  defaultChecked={hasShadow}
                  onChange={toggleShadow}
                />
                <hr />

                <MenuItem
                  onClick={() => {
                    toggleLock(setTextOptions, textOptions);
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
        </div>
      )}
    </>
  );
};

export default FabricTextBox;
