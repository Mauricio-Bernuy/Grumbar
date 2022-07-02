import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useState,
  
} from "react";
import { FabricContext } from "../context/FabricContext";
import { fabric } from "fabric";
import { getActiveStyle, setActiveProp, setActiveStyle } from "../components/libs/utils";

const FabricCanvas = ({ jsonData = null }) => {
  const [width] = useState(window.innerWidth);
  const [height] = useState(window.innerHeight);

  const canvasEl = useRef(null);
  const {
    canvas,
    initCanvas,
    setActiveObject,
    loadFromJSON,
    removeObjects,
    Copy,
    Paste,
    prevGrid,
    coords,
    toggleLock,
    activeObject
  } = useContext(FabricContext);

  useLayoutEffect(() => {
    if (jsonData) {
      loadFromJSON(canvasEl.current, jsonData);
    } else {
      initCanvas(canvasEl.current, {
        width: width,
        height: height,
      });
    }
  }, [canvasEl, initCanvas, loadFromJSON, jsonData, height, width]);

  const updateActiveObject = useCallback(
    (e) => {
      if (!e) {
        return;
      }
      setActiveObject(canvas.getActiveObject());
      canvas.renderAll();
    },
    [canvas, setActiveObject]
  );

  useEffect(() => {
    if (!canvas) {
      return;
    }


    canvas.on("mouse:down", function(opt) {
      var evt = opt.e;
      if (evt.ctrlKey === true) {
        console.log("pressed click + control");
        var target = canvas.findTarget(opt.e);
        if (target)
          if (
            (target.type === "polyline" ||
              target.type === "image" ||
              target.type === "textbox") &&
            this.selection
          ) {
            canvas.setActiveObject(target);
          }
      }
    });

    canvas.on("mouse:down", function(opt) {
      var evt = opt.e;
      if (evt.button === 1 || evt.altKey === true) {
        canvas.discardActiveObject().renderAll();
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    canvas.on("mouse:move", function(opt) {
      if (this.isDragging) {
        var e = opt.e;
        var vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on("mouse:up", function(opt) {
      // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      this.setViewportTransform(this.viewportTransform);
      this.isDragging = false;
      this.selection = true;
    });

    canvas.on("mouse:wheel", function(opt) {
      var delta = opt.e.deltaY;
      var zoom = canvas.getZoom();
      zoom *= 0.999 ** delta;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      // canvas.setZoom(zoom);
      // console.log(zoom, opt.e.offsetX, opt.e.offsetY)
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    setTimeout(function() {
      canvas.on("mouse:move", function(o) {
        var pointer = canvas.getPointer(o.e);
        var px = pointer.x; //o.e.layerX
        var py = pointer.y; //o.e.layerY
        coords.current = { x: px, y: py };
        // const sleep = ms => new Promise(r => setTimeout(r, ms));
      });
    }, 100);
    return () => {
      canvas.off("mouse:down");
      canvas.off("mouse:move");
      canvas.off("mouse:up");
      canvas.off("mouse:wheel");
      canvas.off("mouse:move");
    };
  }, [canvas, coords]);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    canvas.on("selection:created", updateActiveObject);
    canvas.on("selection:updated", updateActiveObject);
    canvas.on("selection:cleared", updateActiveObject);

    return () => {
      canvas.off("selection:created");
      canvas.off("selection:cleared");
      canvas.off("selection:updated");
    };
  }, [canvas, updateActiveObject]);

  // hotkey listener
  useEffect(() => {
    function handleKeyDown(e) {
      e = e || window.event;
      var key = e.which || e.keyCode;

      // Detecting Ctrl
      var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false;

      // del key
      if (key === 46) {
        if (!canvas.getActiveObject()) return;

        // delete selected objects
        if (!canvas.getActiveObject().isEditing)
          // don't remove if text is being edited
          removeObjects();
      }
      // ctrl + C
      if (key === 67 && ctrl) {
        if (!canvas.getActiveObject()) return;
        if (!canvas.getActiveObject().isEditing) {
          e.preventDefault();
          console.log("Ctrl+C is pressed.");
          Copy();
        }
      }
      // ctrl + V
      if (key === 86 && ctrl) {
        let v = true;
        if (canvas.getActiveObject())
          if (canvas.getActiveObject().isEditing) v = false;

        if (v) {
          e.preventDefault();
          console.log("Ctrl+V is pressed.");
          Paste();
        }
      }

      // ctrl + A
      if (key === 65 && ctrl) {
        e.preventDefault();

        canvas.discardActiveObject();

        var selection = [];
        canvas.getObjects().forEach((element) => {
          if (
            element.name === "bound" ||
            element.name === "grid" ||
            element.selectable === false
          )
            return;
          else selection.push(element);
        });

        if (selection.length > 0) {
          var sel = new fabric.ActiveSelection(selection, {
            canvas: canvas,
          });
          canvas.setActiveObject(sel);
          canvas.requestRenderAll();
        }
      }

      // ctrl + X
      if (key === 88 && ctrl) {
        if (!canvas.getActiveObject()) return;
        if (!canvas.getActiveObject().isEditing) {
          // don't remove if text is being edited
          console.log("Ctrl+X is pressed.");
          e.preventDefault();
          Copy();
          removeObjects();
        }
      }
      // ctrl + L
      if (key === 76 && ctrl) {
        e.preventDefault();
        console.log("Ctrl+L is pressed.");
        if (!canvas.getActiveObject()) return;

        if (!canvas.getActiveObject().isEditing) {
          // don't remove if text is being edited
            toggleLock();
    
        }
      }

      if (e.keyCode === 84) {
      }
    }

    const ignore = (e) => {
      e = e || window.event;
      var key = e.which || e.keyCode;

      // // Detecting Ctrl
      // var ctrl = e.ctrlKey ? e.ctrlKey : key === 17 ? true : false;
      // if (key === 76 && ctrl) {
      //   e.preventDefault();
      // }
    };

    document.addEventListener("keydown", ignore);
    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", ignore);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, prevGrid, coords, activeObject, setActiveStyle, getActiveStyle]);

  useEffect(() => {
    // handle dynamic window resize
    let resizeWindow = () => {
      if (canvas) {
        canvas.setHeight(window.innerHeight);
        canvas.setWidth(window.innerWidth);
        canvas.renderAll();
        canvas.calcOffset();
      }
    };
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, [canvas]);

  return (
    <div>
      <canvas
        ref={canvasEl}
        id="fabric-canvas"
        width={width}
        height={height}
        style={{ border: "0px solid black", width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default FabricCanvas;
