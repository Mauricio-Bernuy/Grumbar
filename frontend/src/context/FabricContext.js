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

    const initCanvas = useCallback((el) => {
        const canvasOptions = {
            preserveObjectStacking: true,
            selection: true,
            defaultCursor: "default",
            backgroundColor: "orange",
            fireMiddleClick: true,
            fireRightClick: true,
        }
        let c = new fabric.Canvas(el, canvasOptions)
        initAligningGuidelines(c)
        initHotkeys(c)

        let gridSizeX = 20;
        let gridSizeY = 10;
        
        let boundBox = new fabric.Rect({
            width: gridSizeX*100,
            height: gridSizeY*100, 
            fill: 'gray', 
            stroke: '#EAEAEA',
            hasBorders: false,
            selectable: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true
        });

        c.add(boundBox);
        c.centerObject(boundBox);
        // let square = new fabric.Rect({
        //     top: boundBox.top,
        //     left: boundBox.left,
        //     width: boundBox.width/gridSizeX,
        //     height: boundBox.height/gridSizeY,
        //     fill: 'red'
        // });
        // c.add(square);
        // c.bringToFront(square)

        let linesXN = [];
        let linesYN = [];
        let linesX = [];
        let linesY = [];
            
		//this is for Y lines
		for (let i=0; i < gridSizeX; i++) {
            let l = boundBox.left + ((boundBox.width / gridSizeX) * i);
            let t = boundBox.top;
            let b = boundBox.top + boundBox.height;
  
            linesY.push(new fabric.Line([l,t,l,b],{
              stroke: '#EAEAEA',
              hasBorders: false,
              selectable: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }));
  
            linesXN.push(l);
          }
          
          //this is for X lines
          for (let i=0; i < gridSizeY; i++) {
            let t = boundBox.top + ((boundBox.height / gridSizeY) * i);
            let l = boundBox.left;
            let r = boundBox.left + boundBox.width;
  
            linesX.push(new fabric.Line([l,t,r,t],{
              stroke: '#EAEAEA',
              hasBorders: false,
              selectable: false,
              hasControls: false,
              lockMovementX: true,
              lockMovementY: true
            }))
  
            linesYN.push(t);
          }
  
          //add to canvas for y
          linesY.forEach((line) => {
            c.add(line);
          })
          //add to canvas for x
          linesX.forEach((line) => {
            c.add(line);
          })
  
        c.renderAll()
        setCanvas(c)
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
            value={{ canvas, initCanvas, loadFromJSON, activeObject, setActiveObject }}>
            {children}
        </FabricContext.Provider>
    )
}
