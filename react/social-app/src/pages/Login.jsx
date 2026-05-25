import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const auth = getAuth();

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log("error", error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={loginUser}>
        <label htmlFor="">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Password:{" "}
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
