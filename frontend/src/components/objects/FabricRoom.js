import React, {
    useContext, 
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import testasset from '../../TC_Dungeon Delvers Asset Pack_TreasureChest02.png';
import testfloor from '../../assets/floor textures/Rock Tiles A.jpg'


// const supportedImageTypes = ["image/png", "image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg"]

const FabricRoom = () => {
    const { canvas } = useContext(FabricContext)

  
  let coords = [];

  const addPolyLine = (e) => {

	coords.push(coords[0]);
	console.log(1, coords);
	
	
	const file = testfloor;
	let coordscopy = coords;

	fabric.Image.fromURL(file, function(img) {
		// this scaling reduces pattern resolution, do not use
		// img.scaleToWidth(100); 

		var patternSourceCanvas = new fabric.StaticCanvas();

		patternSourceCanvas.add(img);
		patternSourceCanvas.renderAll();
		patternSourceCanvas.setDimensions({
			width: img.getScaledWidth(),
			height: img.getScaledHeight(),
		  });
		  
		var pattern = new fabric.Pattern({
			source: patternSourceCanvas.getElement(),
			repeat: 'repeat'
		}); 

		// scale with pattern transform to avoid blurring
		pattern.patternTransform = [0.185, 0, 0, 0.185, 0, 0];
		
		let polyline = new fabric.Polyline(coordscopy, {
			cornerStyle: 'circle',
			fill: pattern,
			stroke: "black",		
			dirty: false,
			strokeWidth:10,
			objectCaching: false // greatly increases render resolution
		});

		canvas.add(polyline); 
	 });

	// mantain a constant wall width and tile scale 
	canvas.on('object:scaling', function(e) {
		if (e.target != null) {
		  console.log(e.target);
		  var obj = e.target;
		  
			  obj.fill.patternTransform = [0.185/obj.scaleX, 0, 0, 0.185/obj.scaleY, 0, 0];
			  obj.strokeWidth = 10/obj.scaleX;
		}
	  });
};


  let lock1 = false;
  const getCoords = (e) => {
	  canvas.on('mouse:up', function(opt) {
		let x, y;
		let pointer = canvas.getPointer(opt.e);
		x = pointer.x;
		y = pointer.y;

		if (coords.length > 0 ){
			console.log("length more than zero");
			if (coords[0].x -100 <= x && x <= coords[0].x +100){
				if (coords[0].y -100 <= y && y <= coords[0].y +100){

					console.log("poly closed");
					let listener = canvas.__eventListeners['mouse:up'];
					let curr = listener[listener.length - 1];

					console.log("listen: ", listener);
					console.log("curr: ", curr);
					canvas.off('mouse:up', curr);
					
					lock1 = false;
					addPolyLine();
					
					coords = [];
				}
			}
		}

		coords.push({x,y});
		console.log(coords);		
      });
  };

  

  const bellido1 = (e) => {
	if (lock1 === false) {
	  getCoords(e);
	  lock1 = true;
	}else
	  console.log("OH MY! THIS LOCK BE LIKE: 🥵🍆💦");
  };

    return (
        <>
            <button onClick={bellido1}>Room Tool</button>
            {/* <input type="file" id="fabric-asset" accept="image/*" onChange={onImageUpload}
                   style={{ display: "none" }}/> */}
        </>
    )
}

export default FabricRoom