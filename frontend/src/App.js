import React, { useEffect } from "react";
import { useState } from "react";
import FabricCanvas from "./components/FabricCanvas";
import FabricToolbar from "./components/FabricToolbar";
import { FabricContextProvider } from "./context/FabricContext";
import { NavBar } from "./components/NavBar";
import { NavItem } from "./components/NavItem";
import { DropdownMenu } from "./components/DropdownMenu";
import { LoginButton } from "./components/Login";
import { ReactComponent as ProfileIcon } from "./profileicon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import { FpsView } from "react-fps";
import { MapCardGrid } from "./components/MapCardGrid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Fade } from "@mui/material";

import { TransitionGroup } from "react-transition-group";
// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

function App() {
  const [isEditing, setEditing] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const openEditor = () => {
    let edit = true;
    setEditing(edit);
  };

  return (
    <>
      <div style={{ padding: "0px 0px", height: "100vh" }}>
        {isAuthenticated ? (
          <>
            <NavBar>
              <NavItem icon={<ProfileIcon />}>
                <DropdownMenu />
              </NavItem>
            </NavBar>

            {isEditing ? (
              <FabricContextProvider>

                <div style={{ display: "flex", alignItems: "stretch" }}>
                  <div>
                    <FabricToolbar setEditing={setEditing} />
                  </div>

                  <Fade
                    in={true}
                    style={{ transitionDelay: "500ms" }}
                    timeout={1000}
                  >
                    <div style={{ flex: "1" }}>
                      <FabricCanvas/>

                    </div>
                  </Fade>
                </div>
              </FabricContextProvider>
            ) : (
              <>
                <Typography
                  variant="h1"
                  color="#FFFFFF"
                  align="center"
                  fontFamily={"Helvetica Neue"}
                >
                  {user.name}'s Maps
                </Typography>
                <hr></hr>
                <Box ml={15} mt={2} mb={2}>
                  <Button
                    size="large"
                    variant="outlined"
                    onClick={() => openEditor()}
                  >
                    Create New Map
                  </Button>
                </Box>
                <MapCardGrid setEditing={setEditing} />
              </>
            )}
          </>
        ) : (
          
          <>
            <TransitionGroup>
              <Fade in={true} timeout={500}>
                <div>
                  <LoginButton />
                </div>
              </Fade>
            </TransitionGroup>
          </>
        )}
      </div>
    </>
  );
}

export default App;
