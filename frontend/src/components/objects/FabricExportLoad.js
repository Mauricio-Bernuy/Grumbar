import React, {
	useState,
	useContext, 
	useEffect,
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import exampleJSON from '../../assets/e.json'


// const supportedImageTypes = ["image/png", "image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg"]

const FabricExportLoad = () => {
    const { canvas, activeObject} = useContext(FabricContext)
	
	const ExportJSON = (e) => {
		const json_data = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify(canvas.toDatalessJSON())
		  )}`;

		console.log(json_data);
	
		const link = document.createElement("a");
		link.href = json_data;
		link.download = "data.json";
	
		link.click();
	};

	const LoadJSON = (e) => {
		// console.log(JSON.stringify(exampleJSON));
		canvas.loadFromJSON(JSON.parse(JSON.stringify(exampleJSON)), function(obj) {
			canvas.renderAll();
			console.log(' this is a callback. invoked when canvas is loaded!xxx ');
			
			canvas.forEachObject(function(obj){
				console.log(obj.name);
				
				if(obj.name === 'bound' || obj.name === 'grid'){      
					console.log("found bound")
					obj.set({
							hasBorders: false,
							selectable: false,
							hasControls: false,
							lockMovementX: true,
							lockMovementY: true,
						});
					obj.sendToBack();
					if ( obj.name === 'grid'){
						obj.bringForward()
					}
						
					canvas.add(obj); 
				}
				
				});
			
				
		});  
	};


    return (
        <>
			<hr/>
            <button onClick={ExportJSON}>Export JSON</button>
			<button onClick={LoadJSON}>Load JSON</button>
			<hr/>
        </>
    )
}

export default FabricExportLoad