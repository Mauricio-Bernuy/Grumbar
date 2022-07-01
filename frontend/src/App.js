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
import {StartPage} from "./components/Start"
import MapEditor from "./components/MapEditor"
import {Route, Routes, Link, route} from 'react-router-dom'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const {user,isAuthenticated} = useAuth0()

    useEffect(() => {
        document.body.style.overflow = "hidden";
      }, []);

    return (
      <>
        <div>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/editor" element={<MapEditor/>}/>
          </Routes>
        </div>
      </>
    );
}

export default App;
