import { useContext, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const userContext = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    Cookies.set('uporabnik', username, { expires: 7 });
    const data = await res.json();
    if (data._id !== undefined) {
      userContext.setUserContext(data);
    } else {
      setUsername('');
      setPassword('');
      setError('Invalid username or password');
    }
  }

  return (
    <div className="container">
  {userContext.user ? <Navigate replace to="/home" /> : null}
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card mt-5">
        <div className="card-body">
          <h1 className="card-title text-center">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control input-large" // Add 'input-large' class
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control input-large" // Add 'input-large' class
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="button-28">Log in</button> 
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default Login;
