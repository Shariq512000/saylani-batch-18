import React, { useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { GlobalContext } from './context/Context';
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import axios from 'axios';


const App = () => {

  const { state, dispatch } = useContext(GlobalContext);

  const checkUser = async () => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      dispatch({ type: "USER_LOGOUT" })
      return;
    }
    try {
      const apiRes = await axios.get('https://dummyjson.com/auth/me', { headers: { 'Authorization': `Bearer ${userToken}` } });
      // console.log("ApiRes", apiRes.data)
      dispatch({ type: "USER_LOGIN", user: { ...apiRes.data, accessToken: userToken } })
    } catch (error) {
      localStorage.removeItem("userToken");
      dispatch({ type: "USER_LOGOUT" })
      console.log("Err", error)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div>
      {
        state.isLogin == null ?
          <h1>Loading...</h1>
          :
          state.isLogin ?
            <div className="userApp">
              <Header />
              <div className="mainPage">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
              </div>
              <Footer />
            </div>
            :
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
      }


    </div>
  )
}

export default App