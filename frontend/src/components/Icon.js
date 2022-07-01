/* eslint-disable */
import { useEffect } from "react";
import React from "react";
import { ReactComponent as Svg } from "../assets/GrumbarNoFill.svg";
import { ReactComponent as Svg2 } from "../assets/GrumbarSimple.svg";


const Icon = (props) => {
  const type = props.type;
  return (
    <div>
      {type === "simple" ? (
        <Svg2 fill={props.fill} id={props.id}/>
      ):(
        <Svg fill={props.fill} id={props.id}/>
      )}

    </div>
  )    
}
export default Icon;

