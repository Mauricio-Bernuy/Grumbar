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
    const { canvas, activeObject } = useContext(FabricContext)
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
    })

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
            }
            setTextOptions({ ...textOptions, ...activeOptions })
        }
    }, [activeObject])

    //add layer buttons and locking
    
    let lock = false;
    const addTextBox = (e) => {
        canvas.on('mouse:up', function(opt) {


            console.log(textOptions)
            let textBox = new fabric.Textbox("Add your text here", {
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
                </div>
            }
            <hr/>
        </>
    )
}

export default FabricTextBox
