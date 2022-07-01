import React from 'react'
import { LoginButton } from "./Login"
import { Home } from "./Home"
import {useAuth0} from "@auth0/auth0-react"


export const StartPage = () => {

    const {user,isAuthenticated} = useAuth0()
    
    return (
        <div>
            {isAuthenticated ? (
            <> 
                <Home/>
            </>
          )
          :
          (
            <>
              <LoginButton />
            </>
          )}
        </div>
    );
}