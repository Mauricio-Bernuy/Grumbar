import React, {
	useState,
	useContext, 
	useEffect,
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import {
    getActiveStyle,
    setActiveProp,
    setActiveStyle,
}                        from "../libs/utils"


const FabricGrid = () => {
    const { canvas, activeObject} = useContext(FabricContext)
	const [options, setOptions] = useState({
		gridSizeX: 20,
        gridSizeY: 10,
    })
    const [prevGrid, setPrevGrid] = useState([])

    const updateGridSize = (e) => {
        const value =  parseInt(e.target.value, 10);
        
        setOptions({
            ...options,
            [e.target.name]: value,
        })
    }

    useEffect(() => {
        // TODO call once after canvas is initialized
        if (canvas){
            let gridStore = [];
            let objects = canvas.getObjects();
            
            let linelayer = 1;
            let layerlevel = objects.indexOf(prevGrid[prevGrid.length-1]);

            if (layerlevel > linelayer)
                linelayer = layerlevel;

            for (let i = 0; i < prevGrid.length; i++) {
                canvas.remove(prevGrid[i])
            }
            
            let gridSizeX = options.gridSizeX;
            let gridSizeY = options.gridSizeY;
            
            let boundBox = new fabric.Rect({
                width: gridSizeX*100,
                height: gridSizeY*100, 
                fill: 'gray', 
                stroke: '#EAEAEA',
                hasBorders: false,
                selectable: false,
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,            
            });
            
            // add name id
            boundBox.toObject = (function(toObject) {
            return function() {
                return fabric.util.object.extend(toObject.call(this), {
                name: this.name
                });
            };
            })(boundBox.toObject);
    
            boundBox.name= "bound";
    
            canvas.add(boundBox);
            canvas.centerObject(boundBox);
            boundBox.sendToBack();
			
            gridStore.push(boundBox);


            let linesX = [];
            let linesY = [];
            
            //this is for Y lines
            for (let i=0; i <= gridSizeX; i++) {
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
    
                // add name id
                linesY[linesY.length-1].toObject = (function(toObject) {
                return function() {
                    return fabric.util.object.extend(toObject.call(this), {
                    name: this.name
                    });
                };
                })(linesY[linesY.length-1].toObject);
    
                linesY[linesY.length-1].name= "grid";
            }
            
            //this is for X lines
            for (let i=0; i <= gridSizeY; i++) {
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
    
            linesX[linesX.length-1].toObject = (function(toObject) {
                return function() {
                return fabric.util.object.extend(toObject.call(this), {
                    name: this.name
                });
                };
            })(linesX[linesX.length-1].toObject);
    
            linesX[linesX.length-1].name= "grid";
            }
    
            //add to canvas for y
            linesY.forEach((line) => {
                canvas.add(line);
                line.moveTo(linelayer)
            gridStore.push(line);
            })
            //add to canvas for x
            linesX.forEach((line) => {
                canvas.add(line);
                line.moveTo(linelayer)
            gridStore.push(line);
            })
        
            setPrevGrid(gridStore)
        }
    }, [options]);

    return (
        <>
			{
                <div>
                    <label htmlFor="gridSize">Grid Dimensions:</label>
                    <input type="number"
                           style={{ "width": "40px" }}
                           className="btn-object-action"
                           name="gridSizeX"
                           min="1"
                           value={options.gridSizeX}
                           onInput={updateGridSize}
                    />  
                    <input type="number"
                           style={{ "width": "40px" }}
                           className="btn-object-action"
                           name="gridSizeY"
                           min="1"
                           value={options.gridSizeY}
                           onChange={updateGridSize}
                    />

                </div>
            }
        </>
    )
}

export default FabricGrid