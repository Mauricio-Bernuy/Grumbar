import React, { useContext } from "react"
import { FabricContext }     from "./../context/FabricContext"
import FabricImage           from "./objects/FabricImage"
import FabricLine            from "./objects/FabricLine"
import FabricTextBox         from "./objects/FabricTextBox"
import FabricAsset           from "./objects/FabricAsset"
import FabricRoom            from "./objects/FabricRoom"
import FabricExportLoad            from "./objects/FabricExportLoad"

const FabricToolbar = props => {
    const { canvas } = useContext(FabricContext)

    const removeObjects = () => {
        canvas.getActiveObjects().forEach((obj) => {
            canvas.remove(obj)
        })
        canvas.discardActiveObject().renderAll()
    }
    return (
        <>
            <FabricTextBox/>
            {/* <FabricLine/> */}
            <FabricImage/>
            <FabricAsset/>
            <br/><br/>
            <button onClick={removeObjects}>
                Delete Selected
            </button>
			<FabricRoom/>
            <br></br>
            <FabricExportLoad/>
        </>
    )
}

export default FabricToolbar

