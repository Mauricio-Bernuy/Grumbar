import React from 'react'
import {Link} from 'react-router-dom'

export function MapItem({ map}) {
    const { id, task, completed } = map


    return (
    <li>
        <Link className="linkcolor" to="/editor">{task}</Link>
    </li>
    )
}