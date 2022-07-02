import { MapCardItem } from "./MapCard"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MapPreview from "../assets/MountainsBG.webp"
import { useState } from "react";


const MapCards = [
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 1"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 2"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 3"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 4"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 5"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 6"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 7"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 8"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 9"
    },
    {
        image: MapPreview,
        description: "Map description.",
        name: "Map name 10"
    },
]


export function MapCardGrid(props) {
    const [maps, setMaps] = useState(MapCards)
    
    return (
        <> 
            <Box p={5} sx={{
                mb: 2,
                ml: 10,
                display: "flex",
                flexDirection: "column",
                height: 0.7,
                overflow: "hidden",
                overflowY: "scroll",
                }}>
                <Grid container spacing={10}>
                    {MapCards.map((maps, i) => {
                        let a = {setEditing: props.setEditing};
                        let aa = {...maps,...a};
                        return (
                            <Grid key={i} item>
                                <MapCardItem key={i} {...aa}/>
                            </Grid>)
                    })}
                </Grid>
            </Box>
        </>
    )

}