import React, { useEffect, useState } from 'react';
import User from './User';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/lista', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.log('Failed to fetch users');
        }
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  const handleEdit = async (userId, username, email) => {
    navigate('/editUser/', { state: { userId, username, email } });
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user._id === updatedUser._id) {
          return updatedUser;
        }
        return user;
      });
      return updatedUsers;
    });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User removed successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      } else {
        console.log('Failed to remove the user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Users:</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <User
              key={user._id}
              username={user.username}
              email={user.email}
              onEdit={() => handleEdit(user._id, user.username, user.email)}
              onDelete={() => handleDelete(user._id)}
            />
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default Admin;
