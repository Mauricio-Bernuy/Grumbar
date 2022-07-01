import React from 'react'
import { MapItem } from "./MapItem";

export function MapList({ maps, toggleMap }) {
  return (
    <ul>
        {maps.map((map) => (
            <MapItem key={map.id} map = {map} toggleMap={toggleMap}/>
        ))}
    </ul>
  );
}