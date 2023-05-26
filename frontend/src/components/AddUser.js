import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');

  const getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/${username}`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // Process the retrieved users data
      } else {
        console.log('Failed to fetch users');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the getUsers function passing the username
      await getUsers();

      // Add the user to the box
      await fetch(`http://localhost:3001/box/${location.state.box_id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: location.state.name,
          boxId: location.state.boxId,
          user_id: userId,
        }),
      });

      // Navigate to a success page or perform any additional actions
      navigate('/home');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
