import React from 'react'
import { Profile } from "./Profile"
import { LogoutButton } from "./Logout"

export const DropdownMenu = () => {
    
    function DropdownItem(props) {

        return (
            <a href="#" className="menu-item">
                {props.children}
            </a>
        );
    }

    return (
        <div className="dropdown">
            <DropdownItem>{Profile()}</DropdownItem>
            <DropdownItem>{<LogoutButton/>}</DropdownItem>
        </div>
    );
}