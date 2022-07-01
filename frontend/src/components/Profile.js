import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
export const Profile = () => {
    const {user, isAuthenticated} = useAuth0()

    return (
        isAuthenticated && (
            <div className="contenedor-perfil">
                <img className="img-profile" src={user.picture} alt={user.name}/> 
                <p className="nombre-user">{user.name}</p>
                <p className="email-user">{user.email}</p>
            </div>
        ),
      console.log(user)
    )
}
