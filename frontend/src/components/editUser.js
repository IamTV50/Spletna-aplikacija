import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(location.state.username);
  const [email, setEmail] = useState(location.state.email);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/user/${location.state.userId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
        }),
      });

      if (response.status === 200) {
        // Editing successful
        console.log('User edited successfully');
        navigate('/admin');
        // Redirect to a success page or perform any additional actions
      } else {
        // Editing failed
        console.log('Failed to edit the User');
        // Handle error or display error message to the user
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h3>Edit User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
