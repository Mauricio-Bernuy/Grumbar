import React, {
	useState,
	useContext, 
	useEffect,
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import {
    getActiveStyle,
    setActiveStyle,
}                        from "../libs/utils"

import testfloor from '../../assets/floor textures/Rock Tiles A.jpg'

const FabricRoom = () => {
    const { canvas, activeObject, prevGrid, layerLevel} = useContext(FabricContext)
	const [showTools, setShowTools] = useState(false)
	const [options, setOptions] = useState({
		selectable: false,
        strokeWidth: 1,
		hasControls: false,
		lockMovementX: true,
		lockMovementY: true,
		lockSkewingX: true,
		lockSkewingY: true
    })

	useEffect(() => {
        setShowTools(activeObject ? activeObject.get("type") === "polyline" : false)
        if (activeObject) {
            const activeOptions = {
                strokeWidth: getActiveStyle("strokeWidth", activeObject),
				selectable: getActiveStyle("selectable", activeObject),
				hasControls: getActiveStyle("hasControls", activeObject),
				lockMovementX: getActiveStyle("lockMovementX", activeObject),
				lockMovementY: getActiveStyle("lockMovementY", activeObject)
            }
            setOptions({ ...options, ...activeOptions })
        }
    }, [activeObject])
	
	const updateStrokeWidth = (e) => {
        setOptions({
            ...options,
            strokeWidth: e.target.value,
        })
        setActiveStyle("strokeWidth", parseInt(e.target.value, 10), activeObject)
    }
	
	const toggleLockMovement = (e) => {
        setOptions({
            ...options,
        })

        setActiveStyle("selectable", !getActiveStyle("selectable", activeObject), activeObject)
		setActiveStyle("hasControls", !getActiveStyle("hasControls", activeObject), activeObject)
		setActiveStyle("lockMovementX", !getActiveStyle("lockMovementX", activeObject), activeObject)
		setActiveStyle("lockMovementY", !getActiveStyle("lockMovementY", activeObject), activeObject)
		// activeObject.sendToBack();
			
		// activeObject.bringForward();
    }
	const bringFw = (e) => {
        setOptions({
            ...options,
        })
		let objects = canvas.getObjects();
		let l = objects.indexOf(activeObject)

		let linelayer = 1;
		
		let lyrs = []
		prevGrid.forEach(element => {
			lyrs.push(objects.indexOf(element))
		});
		lyrs.shift()
		let layerlevel = Math.min.apply(null, lyrs)

		// let layerlevel = objects.indexOf(prevGrid[prevGrid.length]);
        // console.log(lyrs,Math.min.apply(null, lyrs))

		
		linelayer = Math.max(linelayer, layerlevel, layerLevel);
		
        // console.log(l, linelayer)

		if (l < (linelayer-1))
			activeObject.bringForward();
    }

	const sendBw = (e) => {
        setOptions({
            ...options,
        })

		let objects = canvas.getObjects();
		let l = objects.indexOf(activeObject)
		if (l > 1)
			activeObject.sendBackwards();
    }


	let coords = [];
	let tempoverlay = []
	let templines = []

	const addPolyLine = (e) => {
		coords.pop()
		coords.push(coords[0]);
		
		const file = testfloor; // Floor asset

		let coordscopy = coords; // using var instead of let in coords may fix this (global ish values?)
		let polyline = null;

		fabric.util.loadImage(file,function(img) {
			
			var pattern = new fabric.Pattern({
				repeat: 'repeat',
			}); 
			pattern.source = img

			pattern.patternTransform = [0.3715, 0, 0, 0.3715, 0, 0];
			
			polyline = new fabric.Polyline(coordscopy, {
				...options,
				cornerStyle: 'circle',
				fill: pattern,
				stroke: "black",		
				dirty: false,
				strokeWidth:10,
				hoverCursor: 'cell',
				// perPixelTargetFind: true,
				objectCaching: false // greatly increases render resolution
			});
			canvas.add(polyline); 
			
			polyline.sendToBack();
			
			polyline.bringForward();

			let objects = canvas.getObjects();
            
            let linelayer = 1;
			
			let lyrs = []
			prevGrid.forEach(element => {
				lyrs.push(objects.indexOf(element))
			});
			lyrs.shift()
			let layerlevel = Math.min.apply(null, lyrs)
			// linelayer = Math.max(linelayer, layerlevel, layerLevel);
            // let layerlevel = objects.indexOf(prevGrid[prevGrid.length-1]);
			
            linelayer = Math.max(linelayer, layerlevel, layerLevel);

			polyline.moveTo(linelayer-1)
			toggleLockMovement()
			
		}.bind(this),{
			crossOrigin: 'anonymous'
		  });

		canvas.renderAll();
	};


	let lock1 = false;
	var detectionRadius = 20 // px
	const getCoords = (e) => {
		canvas.on('mouse:up', function(opt) {
			let x, y;
			let pointer = canvas.getPointer(opt.e);
			x = pointer.x;
			y = pointer.y;
			
			// line drawing
			if(coords.length > 0) {
				let temp = coords[coords.length - 1]
				var line = new fabric.Line([temp.x, temp.y, pointer.x, pointer.y], {
					fill: 'red',
					stroke: 'red',
					strokeWidth: 5,
					selectable: false,
					evented: false,
				  });
				
				  tempoverlay.push(line)
				  canvas.add(line);
			}

			// point drawing
			var object = new fabric.Circle({
				radius: 5,
				fill: 'blue',
				left: pointer.x-5,
				top: pointer.y-5,
				selectable: false,
				hasControls: false,
				lockMovementX: true,
				lockMovementY: true
				
			});

			tempoverlay.push(object)
			canvas.add(object); 
			
			// initial circle 
			if(coords.length === 0) {
				var objectPatrol = new fabric.Circle({
					radius: detectionRadius,
					left: pointer.x-detectionRadius,
					top: pointer.y-detectionRadius,
					fill: 'rgba(0,0,0,0)',
					hasBorder: true,
					stroke: 'black',
					strokeWidth: 2,
					selectable: false,
					hasControls: false,
					lockMovementX: true,
					ockMovementY: true
				});

				tempoverlay.push(objectPatrol)
				canvas.add(objectPatrol);
			}			
			coords.push({x,y});

			// check if near enough to close the circle

			if (coords.length > 1 ){
				console.log("length more than zero");
				if (coords[0].x -detectionRadius <= x && x <= coords[0].x +detectionRadius){
					if (coords[0].y -detectionRadius <= y && y <= coords[0].y +detectionRadius){

						console.log("poly closed");
						let listener = canvas.__eventListeners['mouse:up'];
						let curr = listener[listener.length - 1];

						for(let i = 0; i < tempoverlay.length; i++) {
							canvas.remove(tempoverlay[i])
						}

						for(let i = 0; i < templines.length; i++) {
							canvas.remove(templines[i])
						}

						// console.log("listen: ", listener);
						// console.log("curr: ", curr);
						canvas.off('mouse:up', curr);
						
						lock1 = false;
						addPolyLine();

						coords = [];
						tempoverlay = [];
					}
				}
			}
							
		});
	};

	let lock2 = false;
	const clickOnce = (e) => {
		if (lock1 === false) {
		getCoords(e);
		lock1 = true;
		}else
		console.log("Button already pressed.");

		// mantain a constant wall width and tile scale 
		// SHOULD BE OUTSIDE, CREATES A LOT OF INSTANCES APPARENTLY
		if (canvas && !lock2){
			console.log("ran Once")
			canvas.on('object:scaling', function(e) {
				if (e.target != null) {
					// handle just object
					if (e.target.type === 'polyline'){
						var obj = e.target;
						obj.fill.patternTransform = [0.3715/obj.scaleX, 0, 0, 0.3715/obj.scaleY, 0, 0];
						obj.strokeWidth = (10/obj.scaleX);
					}
					// handle in group
					else if(e.target._objects){
						e.target._objects.forEach(element => {
							if (element.type === 'polyline'){
								var obj = element;
								var relativeX = element.scaleX*e.target.scaleX;
								var relativeY = element.scaleY*e.target.scaleY;
								obj.fill.patternTransform = [0.3715/relativeX, 0, 0, 0.3715/relativeY, 0, 0];
								obj.strokeWidth = (10/relativeX);
							}
						});
					}
				}
			});
			lock2 = true
		}
	};

	

    return (
        <>
            <button onClick={clickOnce}>Room Tool</button>
			{
                showTools &&
                <div>
                    <label htmlFor="strokeWidth">Stroke Width:</label>
                    <input type="number"
                           style={{ "width": "40px" }}
                           className="btn-object-action"
                           name="strokeWidth"
                           min="0"
                           value={options.strokeWidth}
                           onChange={updateStrokeWidth}
                    />
					<hr/>
					<label htmlFor="lockMovement">Lock Movement:</label>
                    <input type="checkbox"
                           style={{ "width": "40px" }}
                           className="toggle-switch-checkbox"
                           name="lockMovement"
						   defaultChecked={!options.selectable}
						//    defaultChecked={true}
                           onChange={toggleLockMovement}
                    />
					<button onClick={bringFw}>Bring Forwards</button>
					<button onClick={sendBw}>Send Backwards</button>

                </div>
            }
        </>
    )
}

export default FabricRoom