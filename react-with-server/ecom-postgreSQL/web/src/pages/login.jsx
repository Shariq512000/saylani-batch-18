import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link } from "react-router";
import { GlobalContext } from '../context/Context';
import "./Login.css";

const Login = () => {
    let { state, dispatch } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login = async (e) => {
        e.preventDefault();
        try {
            const apiRes = await axios.post(`${state.baseUrl}/login`,
                { "email": email, "password": password, },
                { withCredentials: true });
            dispatch({ type: "USER_LOGIN", user: apiRes.data.user });
        } catch (error) {
            alert(error.response.data.message);
            console.log("Err", error);
        }
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">🔐</div>
                    <h1>Welcome Back</h1>
                    <p>Login to your account</p>
                </div>
                <form onSubmit={login} className="login-form">
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input id="email" type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                    <button type="submit" className="login-button"> Login </button>
                </form>
                <div className="signup-link">
                    <span>Don't have an account?</span> <Link to="/signup">Create Account</Link>
                </div>
            </div>
        </div>
    );
}; export default Login;