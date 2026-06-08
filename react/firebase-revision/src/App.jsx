import "./App.css";
import { initializeApp } from "firebase/app";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { Navigate, Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Forget from "./pages/Forget";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyB_ouFiZydaJAXKYsuw7WGfQ1svuj47Xpg",
    authDomain: "social-app-e02b1.firebaseapp.com",
    projectId: "social-app-e02b1",
    storageBucket: "social-app-e02b1.firebasestorage.app",
    messagingSenderId: "201316903682",
    appId: "1:201316903682:web:bea24cda0ce5829ad2301b",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  const [isUserLogedin, setIsUserLogedin] = useState(null);

  useEffect(() => {
    // cookie == "",
    // cookie == "abc@gmail.com"
    // cookie == ""

    onAuthStateChanged(auth, (user) => {
      // 1 sec
      /// This Function Bind With HTTP ONLY COOKIE
      if (user) {
        setIsUserLogedin(true);
        console.log("User Logedin", user);
      } else {
        setIsUserLogedin(false);
        console.log("User Logedout", user);
      }
    });
  }, []);

  return (
    <div className="App">
      {/* <Signin /> */}

      {isUserLogedin == null ? (
        <div>Loading...</div>
      ) : isUserLogedin ? (
        // /login
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
