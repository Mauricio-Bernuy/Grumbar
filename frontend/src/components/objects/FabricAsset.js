import React, {
    useContext, 
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext }          from "../../context/FabricContext"
import testasset from '../../TC_Dungeon Delvers Asset Pack_TreasureChest02.png';


// const supportedImageTypes = ["image/png", "image/apng", "image/bmp", "image/gif", "image/x-icon", "image/jpeg"]

const FabricAsset = () => {
    const { canvas } = useContext(FabricContext)

    // const addTextBox = (e) => {
    //     document.getElementById("fabric-asset-upload").click()
    // }
    const addAsset = (e) => {
        // console.log(path.dirname(__filename));
        // const file = e.target.files[0]
        // const file ='file://'+__dirname+'maidenless.jpg';
        const file = testasset;
        // let fileType = e.target.files[0].type;
        // const reader = new FileReader();
    
        // reader.addEventListener("load", function () {
            fabric.Image.fromURL(file, function(img) {
                img.scaleToWidth(100);
                canvas.add(img);
            });

        // }, false);

        // if (file) {
        //     reader.readAsDataURL(file)
        //     document.getElementById("fabric-image-upload").value = null
        // }
    };

    return (
        <>
            <button onClick={addAsset}>Add Asset</button>
            {/* <input type="file" id="fabric-asset" accept="image/*" onChange={onImageUpload}
                   style={{ display: "none" }}/> */}
        </>
    )
}

export default FabricAsset
