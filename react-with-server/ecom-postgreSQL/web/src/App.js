import logo from './logo.svg';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/login';
import { Routes, Route, Navigate } from "react-router";
import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/Context';
import Home from './pages/Home';
import axios from 'axios';

function App() {
  let { state, dispatch } = useContext(GlobalContext);
  // console.log("state", state)
  const checkUser = async () => {
    try {
      const apiRes = await axios.get(`${state.baseUrl}/me`, { withCredentials: true })
      console.log("apiRes", apiRes.data)
      dispatch({ type: "USER_LOGIN", user: apiRes.data.user })
    } catch (error) {
      dispatch({ type: "USER_LOGOUT" })
      console.log("Err", error)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <div className="App">
      {state.isLogin ?
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        :
        state.isLogin == false ?
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
          :
          <p>Loading...</p>
      }
    </div>
  );
}

export default App;
