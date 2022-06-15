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
                objectCaching: false // MUCH FASTER        
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

            let lineopts = {
                stroke: '#EAEAEA',
                hasBorders: false,
                selectable: false,
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
                objectCaching: false // MUCH FASTER RENDERING
            }
            //this is for Y lines
            for (let i=0; i <= gridSizeX; i++) {
                let l = boundBox.left + ((boundBox.width / gridSizeX) * i);
                let t = boundBox.top;
                let b = boundBox.top + boundBox.height;
    
                let line = (new fabric.Line([l,t,l,b],lineopts));
    
                // add name id
                line.toObject = (function(toObject) {
                    return function() {
                        return fabric.util.object.extend(toObject.call(this), {
                        name: this.name
                        });
                    };
                })
                line.name= "grid";

                canvas.add(line);
                line.moveTo(linelayer)
                gridStore.push(line);
            }
            
            //this is for X lines
            for (let i=0; i <= gridSizeY; i++) {
                let t = boundBox.top + ((boundBox.height / gridSizeY) * i);
                let l = boundBox.left;
                let r = boundBox.left + boundBox.width;
        
                let line = (new fabric.Line([l,t,r,t],lineopts))
        
                line.toObject = (function(toObject) {
                    return function() {
                        return fabric.util.object.extend(toObject.call(this), {
                            name: this.name
                        });
                    };
                })
                // line.toObject;
                line.name= "grid";
                canvas.add(line);
                line.moveTo(linelayer)
                gridStore.push(line);
            }        
            setPrevGrid(gridStore)
        }
    }, [options, canvas]);

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