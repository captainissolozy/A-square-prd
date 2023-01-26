import {Button} from "@mui/material"
import * as React from 'react';
import {useUserContext} from "../../context/UserContexts";


function LogoutBtn1() {

    const {user, setUser} = useUserContext()

    function handleLogout() {
        sessionStorage.removeItem('User');
        sessionStorage.removeItem('email');
        setUser(undefined)
    }


    return (
        <Button className="login-out" onClick={handleLogout}>Logout</Button>
    );
}

export default LogoutBtn1