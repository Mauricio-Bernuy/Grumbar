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
            backgroundColor: "#8083c9",
            fireMiddleClick: true,
            fireRightClick: true,
            imageSmoothingEnabled: false,
        }
        let c = new fabric.Canvas(el, canvasOptions)
        
        initAligningGuidelines(c)
        initHotkeys(c)
        c.renderAll()
        setCanvas(c)
        
        fabric.devicePixelRatio = 2; // oversampling, higher values produce sharper output, decreases performance
        c.setWidth(initialSize.width);
        c.setHeight(initialSize.height);
        c.renderAll();
        c.calcOffset();

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

    return (
        <FabricContext.Provider
            value={{ canvas, initCanvas, 
                    loadFromJSON, activeObject, 
                    setActiveObject, 
                    dimensions, setDimensions,
                    loadedMapName, setloadedMapName,
                    layerLevel,setLayerLevel,
                    prevGrid, setPrevGrid
                    }}>
            {children}
        </FabricContext.Provider>
    )
}
