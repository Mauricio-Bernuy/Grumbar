import React, {
    useState,
    useContext,
    useEffect,
}                        from "react"
import { fabric }        from "fabric"
import { FabricContext } from "../../context/FabricContext"
import {
    getActiveStyle,
    setActiveProp,
    setActiveStyle,
}                        from "../libs/utils"

const FabricTextBox = () => {
    const { canvas, activeObject, prevGrid, layerLevel } = useContext(FabricContext)
    const [showTools, setShowTools] = useState(false)
    const [textOptions, setTextOptions] = useState({
        width: 200,
        top: 10,
        left: 10,
        fontSize: 24,
        fontWeight: "normal",
        fontStyle: "normal",
        textAlign: "left",
        fontFamily: "arial",
        textDecoration: "normal",
        fill: "#000000",
        shadow: 0
    })
    const [hasShadow, setHasShadow] = useState(false)

    useEffect(() => {
        setShowTools(activeObject ? activeObject.get("type") === "textbox" : false)
        if (activeObject) {
            const activeOptions = {
                fontSize: getActiveStyle("fontSize", activeObject),
                fontWeight: getActiveStyle("fontWeight", activeObject),
                fontStyle: getActiveStyle("fontStyle", activeObject),
                textAlign: getActiveStyle("textAlign", activeObject),
                fontFamily: getActiveStyle("fontFamily", activeObject),
                textDecoration: getActiveStyle("textDecoration", activeObject),
                fill: getActiveStyle("fill", activeObject),
                selectable: getActiveStyle("selectable", activeObject),
				hasControls: getActiveStyle("hasControls", activeObject),
				lockMovementX: getActiveStyle("lockMovementX", activeObject),
				lockMovementY: getActiveStyle("lockMovementY", activeObject),
                shadow: getActiveStyle("shadow", activeObject)
            }
            setTextOptions({ ...textOptions, ...activeOptions })
        }
    }, [activeObject])

    const bringFw = (e) => {
        setTextOptions({
            ...textOptions,
        })
			
		activeObject.bringForward();
    }

	const sendBw = (e) => {
        setTextOptions({
            ...textOptions,
        })

        let objects = canvas.getObjects();
		let l = objects.indexOf(activeObject)
		let linelayer = 1;
        let lyrs = []

		prevGrid.forEach(element => {
			lyrs.push(objects.indexOf(element))
		});
		lyrs.shift()
		let layerlevel = Math.max.apply(null, lyrs)
        // console.log(lyrs,layerlevel)

		linelayer = Math.max(linelayer, layerlevel, layerLevel);
        

		if (l > (linelayer+1))
            activeObject.sendBackwards();
			
    }

    //add layer buttons and locking
    const toggleLockMovement = (e) => {
        setTextOptions({
            ...textOptions,
        })
        setActiveStyle("selectable", !getActiveStyle("selectable", activeObject), activeObject)
		setActiveStyle("hasControls", !getActiveStyle("hasControls", activeObject), activeObject)
		setActiveStyle("lockMovementX", !getActiveStyle("lockMovementX", activeObject), activeObject)
		setActiveStyle("lockMovementY", !getActiveStyle("lockMovementY", activeObject), activeObject)
    }
    
    let lock = false;
    const addTextBox = (e) => {
        canvas.on('mouse:up', function(opt) {
            let textBox = new fabric.Textbox("Add your text here", {
                width: 200,
                top: 10,
                left: 10,
                fontSize: 24,
                fontWeight: "normal",
                fontStyle: "normal",
                textAlign: "left",
                // fontFamily: "arial",
                fontFamily: 'Calibri',
                textDecoration: "normal",
                fill: "#000000",
                
            })

            let pointer = canvas.getPointer(opt.e);
            textBox.top = pointer.y -  textBox.getScaledHeight()/2;
            textBox.left = pointer.x -  textBox.getScaledWidth()/2;
            console.log("pointer: ", pointer);

            

            let listener = canvas.__eventListeners['mouse:up'];
            let curr = listener[listener.length - 1];

            console.log("listen: ", listener);
            console.log("curr: ", curr);
            canvas.off('mouse:up', curr);
            canvas.add(textBox)
            lock = false;
        })
    }

    const toggleShadow = (e) => {
        if (hasShadow){
            setTextOptions({
                ...textOptions,
                shadow: 0
            })
            setActiveStyle("shadow", 0, activeObject)
        }
        else{
            let shad = 'rgba(0,0,0,0.3) 1px 1px 1px'
            setTextOptions({
                ...textOptions,
                shadow: shad
            })
            setActiveStyle("shadow", shad, activeObject)
        }
        setHasShadow(!hasShadow)
    }

    const updateFontSize = (e) => {
        setTextOptions({
            ...textOptions,
            fontSize: e.target.value,
        })
        setActiveStyle("fontSize", parseInt(e.target.value, 10), activeObject)
    }

    const updateFill = (e) => {
        setTextOptions({
            ...textOptions,
            fill: e.target.value,
        })
        setActiveProp("fill", e.target.value, activeObject)
    }

    const updateTextAlign = (e) => {
        setTextOptions({
            ...textOptions,
            textAlign: e.currentTarget.value,
        })
        setActiveStyle("textAlign", e.currentTarget.value.toLowerCase(), activeObject)
    }

    const updateBold = (e) => {
        const value = textOptions.fontWeight === "bold" ? "normal" : "bold"
        setTextOptions({
            ...textOptions,
            fontWeight: value,
        })
        setActiveStyle("fontWeight", value, activeObject)
    }

    const updateItalic = (e) => {
        const value = textOptions.fontStyle === "italic" ? "normal" : "italic"
        setTextOptions({
            ...textOptions,
            fontStyle: value,
        })
        setActiveStyle("fontStyle", value, activeObject)
    }

    const updateUnderline = (e) => {
        const value = textOptions.textDecoration === "underline" ? "" : "underline"

        setTextOptions({
            ...textOptions,
            textDecoration: value,
        })
        setActiveStyle("textDecoration", value, activeObject)
        setActiveStyle("underline", !!value.length, activeObject)
    }

    const clickOnce = (e) => {
        if (lock === false) {
        addTextBox(e);
        lock = true;
        }else
        console.log("Button already pressed.");
    };


    return (
        <>
            <button onClick={clickOnce}>Add Text Box</button>
            {
                showTools &&
                <div>
                    <label htmlFor="fontSize">Font Size:</label>
                    <input type="number"
                           style={{ "width": "40px" }}
                           className="btn-object-action"
                           name="fontSize"
                           min="10"
                           value={textOptions.fontSize}
                           onChange={updateFontSize}
                    />
                    <br/>
                    <label htmlFor="color">Fill:</label>
                    <input type="color" name="fill" style={{ "width": "50px" }}
                           value={textOptions.fill}
                           onChange={updateFill}
                           className="btn-object-action"/>
                    <br/>
                    <label htmlFor="text-align" style={{ "display": "inline-block" }}>Text align:</label>
                    <select name="textAlign"
                            className="btn-object-action"
                            onChange={updateTextAlign}
                            value={textOptions.textAlign}
                    >
                        <option value="left">Left</option>
                        <option value="center">Center</option>
                        <option value="right">Right</option>
                    </select>
                    <br/>
                    <div id="text-controls-additional">
                        <button type="button"
                                style={{'background': textOptions.fontWeight === "bold" ? 'white' : 'gray'}}
                                onMouseUp={updateBold}
                                className="btn btn-object-action">
                            <strong>B</strong>
                        </button>
                        <button type="button"
                                style={{'background': textOptions.fontStyle === "italic" ? 'white' : 'gray'}}
                                onMouseUp={updateItalic}
                                className="btn btn-object-action" id="text-cmd-italic">
                            <em>I</em>
                        </button>
                        <button type="button"
                                style={{'background': textOptions.textDecoration === "underline" ? 'white' : 'gray'}}
                                onMouseUp={updateUnderline}
                                className="btn btn-object-action" id="text-cmd-underline">
                            <u>U</u>
                        </button>
                    </div>

                    <label htmlFor="ToggleShadow">Toggle Shadow:</label>
                    <input type="checkbox"
                           style={{ "width": "40px" }}
                           className="toggle-switch-checkbox"
                           name="strokeWidth"
						   defaultChecked={hasShadow}
                           onChange={toggleShadow}
                    />
                    <hr/>

                    <label htmlFor="LockMovement">Lock Movement:</label>
                    <input type="checkbox"
                           style={{ "width": "40px" }}
                           className="toggle-switch-checkbox"
                           name="lockMovement"
						   defaultChecked={!textOptions.selectable}
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

export default FabricTextBox
