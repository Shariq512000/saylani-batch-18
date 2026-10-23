import { useContext, useEffect, useState } from 'react';
import './App.css';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import { GlobalContext } from './context/Context';
import api from './component/api';
import { Navigate, Route, Routes } from 'react-router';

function App() {
    let { state, dispatch } = useContext(GlobalContext);
    // console.log("state", state)
    const checkUser = async () => {
        try {
            const apiRes = await api.get(`/me`)
            console.log("apiRes", apiRes.data)
            dispatch({ type: "USER_LOGIN", user: apiRes.data.user })
        } catch (error) {
            dispatch({ type: "USER_LOGOUT" })
            console.log("Err", error)
        }
    }

    // const objKey = "ghi"
    // const objValue = "value"


    // let obj = {
    //   [objKey]: objValue
    // }
    // console.log("obj", obj[objKey])

    useEffect(() => {
        checkUser()
    }, [])

    return (
        <div className="App">
            {state.isLogin ?
                <Routes>
                    <Route path="/" element={<ChatPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                :
                state.isLogin == false ?
                    <Routes>
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                    :
                    <p>Loading...</p>
            }
        </div>
    );
}

export default App;