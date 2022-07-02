import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, {useContext} from "react";
import Icon from "./Icon";
import { FabricContext } from "../context/FabricContext";


export const NavBar = (props) => {
  const { loadedMapName } = useContext(FabricContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        elevation={24}
        position="static"
        style={{ background: "#006400", paddingLeft: "60px", zIndex: 1 }}
      >
        <Toolbar
          style={{ display: "flex", flexDirection: "row", maxHeight: "100px" }}
        >
          <Box
            sx={{
              width: "30%",
              maxWidth: 75,
            }}
          >
            <Icon type={"simple"} fill={"#122712"} id={"shadow"} />
          </Box>
          <Typography
            variant="h1"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
            id={"title-secondary"}
          >
            Grumbar
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
            id={"text3"}
          >
            {loadedMapName}
          </Typography>
          {props.children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
