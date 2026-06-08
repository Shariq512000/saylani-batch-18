import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, GithubAuthProvider, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router";

const Signin = () => {
  const auth = getAuth();

  const provider = new GithubAuthProvider();

  const googleProvider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("userCredential", userCredential);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const loginWithGithub = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  return (
    <div className="">
      <h1>Signin User</h1>
      <form onSubmit={signinUser}>
        <label htmlFor="">
          Email:{" "}
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Password:{" "}
          <input
            type="text"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button>Signin</button>
      </form>

      <br />

      <button onClick={loginWithGithub}>Login With Github</button>

      <br />
      <br />

      <button onClick={loginWithGoogle}>Login With Google</button>

      <br />
      <br />

      <Link to={"/forget"}>Forget Password</Link>

      <br />

      <Link to={"/signup"}>Create Account</Link>
    </div>
  );
};

export default Signin;
