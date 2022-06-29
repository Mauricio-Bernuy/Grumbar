import React, { useContext, useEffect } from "react";
import { fabric } from "fabric";
import { FabricContext } from "../../context/FabricContext";

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
import { TextField } from "@mui/material";

const FabricGrid = () => {
  const {
    canvas,
    dimensions,
    setDimensions,
    prevGrid,
    setPrevGrid,
    layerLevel,
  } = useContext(FabricContext);

  const updateGridSize = (e) => {
    const value = parseInt(e.target.value, 10);

    setDimensions({
      ...dimensions,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    if (canvas) {
      let gridStore = [];
      let objects = canvas.getObjects();

      let linelayer = 1;
      let layerlevel = objects.indexOf(prevGrid[prevGrid.length - 1]);

      linelayer = Math.max(linelayer, layerlevel, layerLevel);

      for (let i = 0; i < prevGrid.length; i++) {
        canvas.remove(prevGrid[i]);
      }

      let gridSizeX = dimensions.gridSizeX;
      let gridSizeY = dimensions.gridSizeY;

      var shadow = new fabric.Shadow({
        color: "black",
        blur: 30,
      });
      let boundBox = new fabric.Rect({
        width: gridSizeX * 100,
        height: gridSizeY * 100,
        fill: "#dadad9",
        hasBorders: false,
        selectable: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        excludeFromExport: true,
        shadow: shadow,
        objectCaching: false, // MUCH FASTER
      });

      // add name id
      boundBox.toObject = (function(toObject) {
        return function() {
          return fabric.util.object.extend(toObject.call(this), {
            name: this.name,
          });
        };
      })(boundBox.toObject);

      boundBox.name = "bound";

      canvas.add(boundBox);
      // canvas.centerObject(boundBox);
      boundBox.sendToBack();

      gridStore.push(boundBox);

      let lineopts = {
        stroke: "#181818",
        hasBorders: false,
        selectable: false,
        hasControls: false,
        lockMovementX: true,
        lockMovementY: true,
        excludeFromExport: true,
        objectCaching: false, // MUCH FASTER RENDERING
      };
      //this is for Y lines
      for (let i = 0; i <= gridSizeX; i++) {
        let l = boundBox.left + (boundBox.width / gridSizeX) * i;
        let t = boundBox.top;
        let b = boundBox.top + boundBox.height;

        let line = new fabric.Line([l, t, l, b], lineopts);

        // add name id
        line.toObject = function(toObject) {
          return function() {
            return fabric.util.object.extend(toObject.call(this), {
              name: this.name,
            });
          };
        };
        line.name = "grid";

        canvas.add(line);
        line.moveTo(linelayer);
        gridStore.push(line);
      }

      //this is for X lines
      for (let i = 0; i <= gridSizeY; i++) {
        let t = boundBox.top + (boundBox.height / gridSizeY) * i;
        let l = boundBox.left;
        let r = boundBox.left + boundBox.width;

        let line = new fabric.Line([l, t, r, t], lineopts);

        line.toObject = function(toObject) {
          return function() {
            return fabric.util.object.extend(toObject.call(this), {
              name: this.name,
            });
          };
        };
        line.name = "grid";
        canvas.add(line);
        line.moveTo(linelayer);
        gridStore.push(line);
      }
      setPrevGrid(gridStore);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions, canvas]);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const divRef = React.useRef();

  useEffect(() => {
    setAnchorEl(divRef.current);
  }, [divRef, anchorEl]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          transform: "translateY(1000%)",
          height: "10vh",
          width: "10vw",
          marginLeft: "100%",
        }}
        ref={divRef}
      />

      <div>
        {anchorEl && (
          <Popper id={"simple-popper"} anchorEl={anchorEl} open={true}>
            <Paper sx={{height: "65px",width: "300px", maxWidth: "100%", backgroundColor: 'rgba(255,255,255,0.8)', }}>
              <MenuList>
                <MenuItem
                  style={{
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                  disableRipple={true}
                >
                  <Typography variant="overline" style={{ color: "gray", marginRight:"10px" }}>
                      Grid 
                      Dimensions
                    </Typography>

                    <TextField
                      type="number"
                      name="gridSizeX"
                      label="Horizontal"
                      variant="standard"
                      size="small"
                      InputProps={{
                        inputProps: { 
                            min: 1 
                          }
                      }}
                      value={dimensions.gridSizeX}
                      onChange={updateGridSize}
                    />
                    <TextField
                      type="number"
                      name="gridSizeY"
                      label="Vertical"
                      variant="standard"
                      size="small"
                      InputProps={{
                        inputProps: { 
                            min: 1 
                          }
                      }}
                      value={dimensions.gridSizeY}
                      onChange={updateGridSize}
                    />                
                </MenuItem>
              </MenuList>
            </Paper>
          </Popper>
        )}
      </div>
    </>
  );
};

export default FabricGrid;
