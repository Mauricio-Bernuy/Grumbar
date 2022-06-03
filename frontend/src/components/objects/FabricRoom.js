import React, {
    useContext, 
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import testasset from '../../TC_Dungeon Delvers Asset Pack_TreasureChest02.png';


// const supportedImageTypes = ["image/png", "image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg"]

const FabricRoom = () => {
    const { canvas } = useContext(FabricContext)

    // const addTextBox = (e) => {
    //     document.getElementById("fabric-asset-upload").click()
    // }


  var coords = []
  var puntitos = []

  let lock = false;
  const addRoom = (e) => {
	  canvas.on('mouse:up', function(opt) {
		let pointer = canvas.getPointer(opt.e);

		for(let i = 0; i < coords.length; i++) {
			console.log(coords[i].x)
			console.log(coords[i].y)
        }

		
		var object = new fabric.Circle({
			radius: 5,
			fill: 'blue',
			left: pointer.x-5,
			top: pointer.y-5,
			selectable: false,
			hasControls: false,
			lockMovementX: true,
			ockMovementY: true
			
		});

		puntitos.push(object)
		canvas.add(object); 

		if(coords.length == 0) {
			var objectPatrol = new fabric.Circle({
				radius: 20,
				left: pointer.x-20,
				top: pointer.y-20,
				fill: 'rgba(0,0,0,0)',
				hasBorder: true,
				stroke: 'black',
				strokeWidth: 2,
				selectable: false,
				hasControls: false,
				lockMovementX: true,
				ockMovementY: true
			});

			puntitos.push(objectPatrol)
			canvas.add(objectPatrol);
		}
		
		coords.push(pointer)

		if (coords.length > 1){
            console.log("length more than zero");
            if (coords[0].x -20 <= pointer.x && pointer.x <= coords[0].x +20){
                if (coords[0].y -20 <= pointer.y && pointer.y <= coords[0].y +20){
                    console.log("poly closed");
                    let listener = canvas.__eventListeners['mouse:up'];
                    let curr = listener[listener.length - 1];

                    console.log("listen: ", listener);
                    console.log("curr: ", curr);
                    canvas.off('mouse:up', curr);

                    lock = false;

					for(let i = 0; i < puntitos.length; i++) {
						canvas.remove(puntitos[i])
					}

                    coords = [];
					puntitos = [];
                }
            }
        }

      });
  };

  const bellido = (e) => {
	if (lock === false) {
	  addRoom(e);
	  lock = true;
	}else
	  console.log("OH MY! THIS LOCK BE LIKE: 🥵🍆💦");
  };

    return (
        <>
            <button onClick={bellido}>Room Tool</button>
            {/* <input type="file" id="fabric-asset" accept="image/*" onChange={onImageUpload}
                   style={{ display: "none" }}/> */}
        </>
    )
}

export default FabricRoom
