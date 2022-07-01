import { MapCardItem } from "./MapCard"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MapPreview from "../maidenless.jpg"
import {useAuth0} from '@auth0/auth0-react'
import { useState } from "react";


const MapCards = [
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    {
        image: MapPreview,
        description: "Descripcion del mapa. Hola jaja este es mi mapa de la caverna del dungeon mas pogerinos de la historia de los dungeons de los dungeon pogerinis",
        name: "Nombre del mapa"
    },
    

]

export function MapCardGrid() {

    const {user} = useAuth0()
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
                    {MapCards.map((MapCard, i) => {
                        return (
                            <Grid key={i} item>
                                <MapCardItem key={i} {...MapCard}/>
                            </Grid>)
                    })}
                </Grid>
            </Box>
        </>
    )

}