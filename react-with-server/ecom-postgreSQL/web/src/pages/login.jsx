import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link } from "react-router";
import { GlobalContext } from '../context/Context';

const Login = () => {
    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            const apiRes = await axios.post(`${state.baseUrl}/login`, {
                "email": email,
                "password": password,
            }, { withCredentials: true })
            dispatch({ type: "USER_LOGIN", user: apiRes.data.user })
            // alert(apiRes.data.user)
        } catch (error) {
            alert(error.response.data.message)
            console.log("Err", error)
        }
    }

    return (
        <div>
            <form onSubmit={login}>
                <label htmlFor="">
                    Email: <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </label>
                <br />
                <label htmlFor="">
                    Password: <input type="text" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </label>
                <br />
                <button>Submit</button>
            </form>
            <Link to="/signup">Go To Sign Page</Link>
        </div>
    )
}

export default Login