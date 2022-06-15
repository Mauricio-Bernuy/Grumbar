import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useCallback,
    useState,
}                        from "react"
import { FabricContext } from "../context/FabricContext"

// const FabricCanvas = ({ jsonData = null, width = 810, height = 140 }) => {
const FabricCanvas = ({ jsonData = null }) => {

    // const [windowSize, setWindowSize] = useState([816,144])
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    
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

    // hotkey listener 
    useEffect(() => {
        function handleKeyDown(e) {
            
            if (e.keyCode === 46) { // delete selected objects
                console.log(e.target);
            console.log(e.keyCode);
                removeObjects(canvas);
            }
            if (e.keyCode === 84) { 
                console.log(e.target);
                console.log(e.keyCode);
            }
        }
    
        document.addEventListener("keydown", handleKeyDown);
    
        return function cleanup() {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [canvas]);
   
    // useEffect(() => {
        
    //     if (canvas){
    //         window.addEventListener("resize",canvas.setWidth(window.innerHeight));
    //         return () => window.removeEventListener("resize", canvas.setWidth(window.innerHeight));
    //     }
    //         // canvas.setWidth(window.innerHeight);
    //         // canvas.setHeight(window.innerWidth);
    //         // canvas.renderAll()
    //         // canvas.setDimensions({width: window.innerHeight, height: window.innerWidth}, {cssOnly: true})
    //     })

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
    };

    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    
    return (
        <div>
            <canvas ref={canvasEl}
                    id="fabric-canvas"
                    height={2000}
                    width={2000}
                    // width={windowWidth}
                    // height={windowHeight}
                    // width={width*window.devicePixelRatio}
                    // height={height*window.devicePixelRatio}
                    style={{ border: "1px solid black", width: "100%", height: "100%" }}
                    />
        </div>
    )
}

export default FabricCanvas
