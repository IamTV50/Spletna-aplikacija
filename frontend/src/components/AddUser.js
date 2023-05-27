import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function AddUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const getUsers = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${username}/user`, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        // Process the retrieved users data
        return data._id; // Return the retrieved _id
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message); // Throw an error with the error message
      }
    } catch (error) {
      setErrorMessage(error.message); // Set the error message in the state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the getUsers function passing the username
      const user_id = await getUsers();

      if (user_id) {
        // Add the user to the box
        await fetch(`http://localhost:3001/box/${location.state.box_id}/add`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: location.state.name,
            boxId: location.state.boxId,
            user_id: user_id, // Use the retrieved _id as user_id
          }),
        });

        // Navigate to a success page or perform any additional actions
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', marginTop: '-100px' }}>
      <div className="col-md-6">
        <h2 className="text-center mb-4">Add a User by Typing in Their Username:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn button-28 mb-3">
              Add User
            </button>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
