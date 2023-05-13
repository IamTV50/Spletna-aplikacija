import { useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Logout(){
    const userContext = useContext(UserContext); 
    useEffect(function(){
        const logout = async function(){
            userContext.setUserContext(null);
            const res = await fetch("http://localhost:3001/users/logout");
        }
        Cookies.remove("uporabnik");
        logout();
    }, []);

    return (
        <Navigate replace to="/" />
    );
}

export default Logout;