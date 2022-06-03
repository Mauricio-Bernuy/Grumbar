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
  let lock = false;
  const addAsset = (e) => {
	  canvas.on('mouse:up', function(opt) {
		let x, y, x2, y2;
		let pointer = canvas.getPointer(opt.e);
		x = pointer.x;
		y = pointer.y;
		x2 = x + 200;
		y2 = y + 300;
		let line = new fabric.Line([x, y, x2, y2]);
		line.stroke = '#FFFFF';
		canvas.add(line);

		let listener = canvas.__eventListeners['mouse:up'];
		let curr = listener[listener.length - 1];

		console.log("listen: ", listener);
		console.log("curr: ", curr);
		canvas.off('mouse:up', curr);

		lock = false;
      });

  };

  const bellido = (e) => {
	if (lock === false) {
	  addAsset(e);
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
