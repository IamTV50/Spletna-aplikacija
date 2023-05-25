import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../userContext';
import User from '../../../backend/models/userModel';

function Admin(props){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try{
                const response = await fetch('http://localhost:3001/user',{
                    method: 'GET',
                });

                if(response.ok){
                    const data = await response.json();
                    setUsers(data);
                }else{
                    console.log('Failed to fetch users');
                }
            } catch (error){
                console.error(error)
            }
        };a
        
        getUsers();
    },  [data]);

return(
    <div>
        <h3>Users:</h3>
        {users.length > 0 ? (
            <ul>
                {users.map((user) => (
                    <React.Fragment key={user._id}>
                        <User
                            name ={user.name}
                            gmail ={user.gmail}
                        />
                    </React.Fragment>
                ))}
            </ul>
        ) : (
            <p>No users found.</p>
        )}
    </div>

);
}
export default Admin;