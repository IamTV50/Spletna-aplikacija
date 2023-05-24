import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile() {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await fetch("http://localhost:3001/users/profile", { credentials: "include" });
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
  }, []);

  return (
    <>
      {!userContext.user ? <Navigate replace to="/login" /> : ""}
      <div className="container">
        <h1>User Profile</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Username: {profile.username}</h5>
            <p className="card-text">Email: {profile.email}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
