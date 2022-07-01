import React, { useEffect }      from 'react';
import FabricCanvas              from "./FabricCanvas"
import FabricToolbar             from "./FabricToolbar"
import { FabricContextProvider } from "../context/FabricContext"
import {NavBar} from "./NavBar"
import {NavItem} from "./NavItem"
import {DropdownMenu} from "./DropdownMenu"
import {ReactComponent as ProfileIcon} from "../profileicon.svg"
import {useAuth0} from "@auth0/auth0-react"
import {FpsView} from "react-fps";
import { useNavigate, Link} from "react-router-dom";

function MapEditor() {
      useEffect(() => {
          document.body.style.overflow = "hidden";
        }, []);
  
      return (
        <>
          <div style={{"padding": "0px 0px", 'height':'100vh' }}>
              <> 
                <NavBar>
                  <li className="nav-item">
                    <Link className="icon-button" to="/">🔙</Link>
                  </li>
                  <NavItem icon={<ProfileIcon/>}>
                    <DropdownMenu/>
                  </NavItem>
                </NavBar>
                <FabricContextProvider>
                  <div style={{ "display": "flex", "alignItems": "stretch" }}>
                      <div style={{ "width": "100px", "background": "gray", "padding": "20px 20px 0 20px" }}>
                        <FabricToolbar/>
                        
                        <FpsView width={100} height={20} top={window.innerHeight-50} left={0}/>
                      </div>
                      <div style={{ "flex": "1" }}>
                        <FabricCanvas/>
                      </div>
                  </div>
                </FabricContextProvider>
              </>
          </div>
        </>
      );
  }
  
  export default MapEditor;