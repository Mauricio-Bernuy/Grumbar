// Core Functions
export const getActiveStyle = (styleName, activeObject) => {
    if (!activeObject) {
        return ""
    }
    return (activeObject.getSelectionStyles && activeObject.isEditing)
        ? (activeObject.getSelectionStyles()[styleName] || "")
        : (activeObject[styleName] || "")
}

export const setActiveStyle = (styleName, value, activeObject) => {
    if (!activeObject) {return}

    if (activeObject.setSelectionStyles && activeObject.isEditing) {
        let style = {}
        style[styleName] = value
        activeObject.setSelectionStyles(style)
        activeObject.setCoords()
    } else {
        activeObject.set(styleName, value)
    }

    activeObject.setCoords()
    activeObject.canvas.renderAll()
}

export const getActiveProp = (name, activeObject) => {
    if (!activeObject) {return ""}
    return activeObject[name] || ""
}

export const setActiveProp = (name, value, activeObject) => {
    if (!activeObject) {
        return
    }
    activeObject.set(name, value).setCoords()
    activeObject.canvas.renderAll()
}

// Extra Functions

// export const removeObjects = (canvas) => {
//     if (!canvas) {
//         return
//     }
//     canvas.getActiveObjects().forEach((obj) => {
//         canvas.remove(obj)
//     })
//     canvas.discardActiveObject().renderAll();
    
//     console.log('deleted object(s)');
// }
