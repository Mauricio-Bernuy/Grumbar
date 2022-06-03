import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useCallback,
    useState,
}                        from "react"
import { FabricContext } from "../context/FabricContext"
import testasset from '../TC_Dungeon Delvers Asset Pack_TreasureChest02.png';
import { fabric }        from "fabric"

const FabricCanvas = ({ jsonData = null, width = 816, height = 144 }) => {
    const canvasEl = useRef(null)
    const { canvas, initCanvas, setActiveObject, loadFromJSON } = useContext(FabricContext)

    useLayoutEffect(() => {
        if (jsonData) {
            loadFromJSON(canvasEl.current, jsonData)
        } else {
            initCanvas(canvasEl.current, {
                width: width,
                height: height,
            })
        }
    }, [canvasEl, initCanvas, loadFromJSON, jsonData, height, width])

    const updateActiveObject = useCallback((e) => {
        if (!e) {
            return
        }
        setActiveObject(canvas.getActiveObject())
        canvas.renderAll()
    }, [canvas, setActiveObject])

    useEffect(() => {
        if (!canvas) {
            return
        }
        canvas.on("selection:created", updateActiveObject)
        canvas.on("selection:updated", updateActiveObject)
        canvas.on("selection:cleared", updateActiveObject)

        return () => {
            canvas.off("selection:created")
            canvas.off("selection:cleared")
            canvas.off("selection:updated")
        }
    }, [canvas, updateActiveObject])

    
    // move these to somewhere else and call them from the hotkey listener and other places 

    const removeObjects = (canvas) => {
        canvas.getActiveObjects().forEach((obj) => {
            canvas.remove(obj)
        });
        canvas.discardActiveObject().renderAll();
        console.log('deleted object(s)');
    }

    // const addAsset = (canvas,e) => {
    //     const file = testasset;
    //     fabric.Image.fromURL(file, function(img) {
    //         img.scaleToWidth(100);
    //         img.top = e.y;
    //         img.left = e.x;
    //         canvas.add(img);
    //     });
    // };

    // hotkey listener 
    // let tilePaintMode = true;
    const [tilePaintMode, setTilePaintMode] = useState(true);

    useEffect(() => {
        function handleKeyDown(e) {
            console.log(e.target);
            console.log(e.keyCode);
            if (e.keyCode === 46) { // delete selected objects
                
                removeObjects(canvas);
            }
            if (e.keyCode === 84) { 
                setTilePaintMode(false);
                console.log(tilePaintMode);
                // canvas.__eventListeners["mouse:down"][2] = [];
                // canvas.__eventListeners["mouse:down"] = [];
                // paint tiles
                // addAsset(canvas,e);
                // var pointer = canvas.getPointer();t
                // var posX = pointer.x;
                // var posY = pointer.y;
                // console.log(posX+", "+posY);
                // console.log(i)
            }
        }
    
        document.addEventListener("keydown", handleKeyDown);
    
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [canvas,tilePaintMode]);


    // useEffect(() => {
    //     if (!canvas)
    //         return;

    //     canvas.on('mouse:down', function(options) {
    //         // if (tilePaintMode === true){
    //         //     console.log(tilePaintMode);

    //             var pointer = canvas.getPointer(options.e);
    //             // console.log(pointer)
    //             canvas.add(new fabric.Circle({ 
    //                 left: pointer.x, 
    //                 top: pointer.y, 
    //                 radius: 5, 
    //                 fill: '#9f9', 
    //                 originX: 'right', 
    //                 originY: 'bottom',
    //             })
    //             )
    //         // }
    //     });
    //     }, [canvas,tilePaintMode]);

    
    
    return (
        <div>
            <canvas ref={canvasEl}
                    id="fabric-canvas"
                    width={1600}
                    height={800}
                    style={{ border: "1px solid black" }}
                    />
        </div>
    )
}

export default FabricCanvas
