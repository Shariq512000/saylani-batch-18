import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router";

const Signup = () => {
  const auth = getAuth();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // console.log("userCredential", userCredential);
        // updateProfile(userCredential, {
        //   displayName: userName,
        // })
        //   .then(() => {
        //     // Profile updated!
        //     // ...
        //   })
        //   .catch((error) => {
        //     // An error occurred
        //     // ...
        //   });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <div className="">
      <h1>Signup User</h1>
      <form onSubmit={signupUser}>
        <label htmlFor="">
          Full Name:
          <input
            type="text"
            placeholder="Enter Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Email:
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Password:
          <input
            type="text"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Signup</button>
      </form>

      <br />

      <Link to={"/login"}>Already Have An Account</Link>
    </div>
  );
};

export default Signup;
