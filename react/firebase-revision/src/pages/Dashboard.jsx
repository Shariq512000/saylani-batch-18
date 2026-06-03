import { getAuth, signOut } from "firebase/auth";
import React from "react";

const Dashboard = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>{currentUser.displayName}</h1>
      <p>{currentUser.email}</p>
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
