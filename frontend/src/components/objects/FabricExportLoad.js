import React, {
	useContext, 
}                        from "react"
import { FabricContext }          from "../../context/FabricContext"

const FabricExportLoad = () => {
    const { canvas, dimensions, setDimensions, loadedMapName, setLayerLevel, prevGrid} = useContext(FabricContext)
	
	const ExportJSON = (e) => {
		
		let dims = JSON.stringify(dimensions)
		console.log(dims)
		
		let objects = canvas.getObjects();
		
		let layer = JSON.stringify({layerLevel: objects.indexOf(prevGrid[prevGrid.length-1])})

		const json_data = `data:text/json;chatset=utf-8,${encodeURIComponent(
			JSON.stringify([dims, layer, canvas.toDatalessJSON()])
		  )}`;

		console.log(json_data);
	
		const link = document.createElement("a");
		link.href = json_data;
		link.download = loadedMapName + ".grum";
	
		// link.href = canvas.toSVG();
		// link.download = loadedMapName + ".png";

		link.click();
	};

	const addTextBox = (e) => {
        document.getElementById("fabric-file-upload").click()
    }


	const LoadJSON = (e) => {
		const file = e.target.files[0]
        const reader = new FileReader();
		// console.log(file)

		
        reader.addEventListener("load", function () {
			const fileReader = new FileReader();
			fileReader.readAsText(file, "UTF-8");

			fileReader.onload = e => {
				let filedata = JSON.parse(e.target.result)
				console.log(filedata);
				canvas.loadFromJSON(JSON.parse(JSON.stringify(filedata))[2], function(obj) {
					canvas.renderAll();
					setLayerLevel(JSON.parse(JSON.parse(JSON.stringify(filedata))[1]).layerLevel)
					let data = JSON.parse(JSON.parse(JSON.stringify(filedata))[0])
					setDimensions(data)		

					canvas.forEachObject(function(obj){
						console.log(obj.type);
						
						if (obj.type === 'polyline'){
							console.log("found poly")
							obj.set({
								// ...options,
								selectable: false,
								hasControls: false,
								lockMovementX: true,
								lockMovementY: true,
								lockSkewingX: true,
								lockSkewingY: true,

								cornerStyle: 'circle',
								stroke: "black",		
								dirty: false,
								strokeWidth:10,
								hoverCursor: 'cell',
								objectCaching: false // greatly increases render resolution
							});
						}
						
					});

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
				});
			};
			

			console.log("sucess")

        }, false);

        if (file) {
            reader.readAsDataURL(file)
            document.getElementById("fabric-file-upload").value = null
        }
		
	};

	
    return (
        <>
			<hr/>
            <button onClick={ExportJSON}>Export Map File</button>
			<button onClick={addTextBox}>Load Map File</button>
            <input type="file" id="fabric-file-upload" accept=".grum" onChange={LoadJSON}
                   style={{ display: "none" }}/>
			<hr/>
        </>
    )
}

export default FabricExportLoad