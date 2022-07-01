import React, { useState, useRef, useEffect } from "react";
import FabricCanvas              from "./FabricCanvas"
import FabricToolbar             from "./FabricToolbar"
import { FabricContextProvider } from "../context/FabricContext"
import {NavBar} from "./NavBar"
import {NavItem} from "./NavItem"
import {DropdownMenu} from "./DropdownMenu"
import {ReactComponent as ProfileIcon} from "../profileicon.svg"
import {useAuth0} from "@auth0/auth0-react"
import {FpsView} from "react-fps";
import { v4 as uuidv4 } from 'uuid';
import { MapList } from "./MapList";


export const Home = () => {
    
    const [maps, setMaps] = useState([])

    const mapTaskRef = useRef();
    const btnAddRef = useRef();


    const toggleMap = (id) => {
        const newMaps = [...maps]
        const map = newMaps.find((map) => map.id === id)
        map.completed = !map.completed
        setMaps(newMaps)
    }

    const handleMapAdd = () => {
        const task = mapTaskRef.current.value

        let present = false

        for(let i = 0; i < maps.length; i++) {
            if(task === maps[i].task) {
                present = true
                alert('map already exists')
            }
        }
        if (task === '' || present) {
            mapTaskRef.current.value = null;
            return;
        }
        else {
            setMaps((prevMaps) => {
                return [...prevMaps, {id: uuidv4(), task, completed: false}]
            })
            mapTaskRef.current.value = null;
        }
    }

    return (
        <>
            <NavBar>
                <NavItem icon={<ProfileIcon/>}>
                    <DropdownMenu/>
                </NavItem>
            </NavBar>
            <div>
                {/* <button onClick={() => navigateEditor()}>Create new map</button> */}
                <input ref = {mapTaskRef} type="text" placeholder="Create New Map"/>
                <button ref = {btnAddRef} onClick={handleMapAdd}>➕</button>
                <MapList maps={maps} toggleMap={toggleMap}/>
            </div>
        </>
    );
}