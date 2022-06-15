import React, { useEffect }      from 'react';
import FabricCanvas              from "./components/FabricCanvas"
import FabricToolbar             from "./components/FabricToolbar"
import { FabricContextProvider } from "./context/FabricContext"
import {NavBar} from "./components/NavBar"
import {NavItem} from "./components/NavItem"
import {DropdownMenu} from "./components/DropdownMenu"
import { LoginButton } from "./components/Login"
import {ReactComponent as ProfileIcon} from "./profileicon.svg"
import {useAuth0} from "@auth0/auth0-react"
import {FpsView} from "react-fps";

function App() {
  const {user,isAuthenticated} = useAuth0()

    useEffect(() => {
        document.body.style.overflow = "hidden";
      }, []);

    return (
      <>
        <div style={{"padding": "10px 10px", 'height':'100vh' }}>
          {/* {isAuthenticated ? ( */}
            <> 
              {/* <NavBar>
                <NavItem icon={<ProfileIcon/>}>
                  <DropdownMenu/>
                </NavItem>
              </NavBar> */}
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
          {/* ):(
            <>
              <LoginButton />
            </>
          )} */}
        </div>
      </>
    );
}

export default App;
