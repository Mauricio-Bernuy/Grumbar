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
import testasset from '../../TC_Dungeon Delvers Asset Pack_TreasureChest02.png';

const FabricAsset = () => {
    const { canvas, activeObject} = useContext(FabricContext)
	const [showTools, setShowTools] = useState(false)
	const [options, setOptions] = useState({
		selectable: true,
		hasControls: true,
		lockMovementX: false,
		lockMovementY: false
    })

	useEffect(() => {
        setShowTools(activeObject ? activeObject.get("type") === "image" : false)
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
	
	const bringFw = (e) => {
        setOptions({
            ...options,
        })
			
		activeObject.bringForward();
    }

	const sendBw = (e) => {
        setOptions({
            ...options,
        })
			
		activeObject.sendBackwards();
    }

	const toggleLockMovement = (e) => {
        setOptions({
            ...options,
        })
        setActiveStyle("selectable", !getActiveStyle("selectable", activeObject), activeObject)
		setActiveStyle("hasControls", !getActiveStyle("hasControls", activeObject), activeObject)
		setActiveStyle("lockMovementX", !getActiveStyle("lockMovementX", activeObject), activeObject)
		setActiveStyle("lockMovementY", !getActiveStyle("lockMovementY", activeObject), activeObject)
    }
    
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

    const clickOnce = (e) => {
        if (lock === false) {
        addAsset(e);
        lock = true;
        }else
        console.log("Button already pressed.");
    };

    return (
        <>
            <button onClick={clickOnce}>Add Asset</button>
            {
                showTools &&
                <div>
					<label htmlFor="LockMovement">Lock Movement:</label>
                    <input type="checkbox"
                           style={{ "width": "40px" }}
                           className="toggle-switch-checkbox"
                           name="strokeWidth"
						   defaultChecked={!options.selectable}
                           onChange={toggleLockMovement}
                    />
                    <hr/>
                    <button onClick={bringFw}>Bring Forwards</button>
					<button onClick={sendBw}>Send Backwards</button>
                </div>
            }
			<hr/>
        </>
    )
}

export default FabricAsset
