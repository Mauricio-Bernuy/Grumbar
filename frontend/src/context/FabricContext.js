import React, {
    useCallback,
    createContext,
    useState,
}                                 from "react"
import { fabric }                 from "fabric"
import { initAligningGuidelines } from "../components/handlers/aligning_guidelines"
import { initHotkeys } from "../components/handlers/initHotkeys"

export const FabricContext = createContext([])

export const FabricContextProvider = ({ children }) => {
    const [canvas, setCanvas] = useState(null)
    const [activeObject, setActiveObject] = useState(null)
    const [dimensions, setDimensions] = useState({
		gridSizeX: 20,
        gridSizeY: 10,
    })
    const [layerLevel, setLayerLevel] = useState(-1)
    const [prevGrid, setPrevGrid] = useState([])


    const [loadedMapName, setloadedMapName] = useState("default_map_name")
    
    const initCanvas = useCallback((el, initialSize) => {
        const canvasOptions = {
            preserveObjectStacking: true,
            selection: true,
            defaultCursor: "default",
            backgroundColor: "#181818",
            fireMiddleClick: true,
            fireRightClick: true,
            imageSmoothingEnabled: false,

        }
        let c = new fabric.Canvas(el, canvasOptions)
        
        initAligningGuidelines(c)
        
        // initHotkeys(c, canvas)
        
        c.renderAll()
        setCanvas(c)
        
        fabric.devicePixelRatio = 2; // oversampling, higher values produce sharper output, decreases performance
        c.setWidth(initialSize.width);
        c.setHeight(initialSize.height);
        
        
        c.renderAll();
            
        c.calcOffset();


		// c.selection = false


        fabric.Object.prototype.borderColor = 'darkred';
        fabric.Object.prototype.cornerColor = 'darkred';
        fabric.Object.prototype.transparentCorners = false;

    }, [])
    

    const loadFromJSON = useCallback((el, json) => {
        let c = new fabric.Canvas(el)
        c.loadFromJSON(
            json,
            () => {
                c.renderAll.bind(c)
                c.setWidth(json.width)
                c.setHeight(json.height)
            },
            function(o, object) {
                fabric.log(o, object)
            })
        c.renderAll()
        setCanvas(c)
    }, [])

    
    const centerCanvasOnGrid = (e) => {
		let group = prevGrid[0]
		console.log(group.width, group.height)
        
		let zoomX =  canvas.height / (group.height)
		let zoomY =  canvas.width / (group.width)
		let zoom = Math.min(zoomX, zoomY) *0.9
        
        // let prvz = canvas.getZoom()
		// let vpw = (canvas.width-140) / zoom
		// let vph = (canvas.height-65) / zoom
		// let x = (group.left - vpw / 2)  
		// let y = (group.top - vph / 2) 

        console.log("group",group.left,group.top)
        
        var vpt = canvas.viewportTransform;

        let prevState={
            vpt: [...vpt]
        }

        canvas.setViewportTransform([zoom, 0, 0, zoom, 0, 0]);

        // canvas.setViewportTransform(vptCopy);

        // canvas.zoomToPoint(new fabric.Point(canvas.width / 2, canvas.height / 2), 1.0);

		// canvas.absolutePan({x:(x+group.width/2), y:(y+group.height/2)})
		// canvas.zoomToPoint({x:(group.width/2), y:(group.height/2)}, zoom);

        // console.log("xd",(x+group.width/2),(y+group.height/2))
        
        
		// canvas.absolutePan({x:0, y:0})
		// canvas.setZoom(zoom)
        
		// canvas.absolutePan({x:-(x+group.width/2), y:-(y+group.height/2)})
		// canvas.setZoom(prvz)
        
        return(prevState)
    }
    const removeObjects = (e) => {
        canvas.getActiveObjects().forEach((obj) => {
            canvas.remove(obj)
        });
        canvas.discardActiveObject().renderAll();
        console.log('deleted object(s)');
    }

    return (
        <FabricContext.Provider
            value={{ canvas, initCanvas, 
                    loadFromJSON, activeObject, 
                    setActiveObject, 
                    dimensions, setDimensions,
                    loadedMapName, setloadedMapName,
                    layerLevel,setLayerLevel,
                    prevGrid, setPrevGrid,
                    centerCanvasOnGrid,
                    removeObjects
                    }}>
            {children}
        </FabricContext.Provider>
    )
}
