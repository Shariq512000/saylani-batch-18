import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const auth = getAuth();

  const registerUser = async (e) => {
    e.preventDefault();
    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);
    } catch (error) {
      console.log("Err", error);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form onSubmit={registerUser}>
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
        <button>Sugnup</button>
      </form>
    </div>
  );
};

export default Signup;
