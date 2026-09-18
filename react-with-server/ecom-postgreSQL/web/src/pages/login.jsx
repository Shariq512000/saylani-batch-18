import React, { useState } from 'react';
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();
        try {
            const apiRes = await axios.post("http://localhost:5000/login", {
                "email": email,
                "password": password,
            }, { withCredentials: true })
            // alert(apiRes.data.message)
        } catch (error) {
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
        </div>
    )
}

export default Login