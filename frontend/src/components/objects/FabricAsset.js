import React, {
    useContext, 
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import testasset from '../../TC_Dungeon Delvers Asset Pack_TreasureChest02.png';
import testfloor from '../../assets/floor textures/Rock Tiles A.jpg'



// const supportedImageTypes = ["image/png", "image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg"]

const FabricAsset = () => {
    const { canvas } = useContext(FabricContext)

    // const addTextBox = (e) => {
    //     document.getElementById("fabric-asset-upload").click()
    // }
  let lock = false;
  const addAsset = (e) => {
	  canvas.on('mouse:up', function(opt) {
        const file = testasset;
        fabric.Image.fromURL(file, function(img) {
            img.scaleToWidth(100);
            img.snapAngle=15
			let pointer = canvas.getPointer(opt.e);
			img.top = pointer.y - img.getScaledHeight()/2;
			img.left = pointer.x - img.getScaledWidth()/2;
			console.log("pointer: ", pointer);
            canvas.add(img);
        });
		let listener = canvas.__eventListeners['mouse:up'];
		let curr = listener[listener.length - 1];

		console.log("listen: ", listener);
		console.log("curr: ", curr);
		canvas.off('mouse:up', curr);

		lock = false;
	  })
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
            <button onClick={bellido}>Add Asset</button>
            {/* <input type="file" id="fabric-asset" accept="image/*" onChange={onImageUpload}
                   style={{ display: "none" }}/> */}
        </>
    )
}

export default FabricAsset
