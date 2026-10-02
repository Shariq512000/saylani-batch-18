import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link } from "react-router";
import { GlobalContext } from '../context/Context';
import "./Signup.css";
import api from '../component/api';

const Signup = () => {
    let { state } = useContext(GlobalContext);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const signUp = async (e) => {
        e.preventDefault();

        try {
            const apiRes = await api.post(`/signup`, {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phone": phone,
                "isSeller": document.getElementById("role").checked
            });

            alert(apiRes.data.message);

        } catch (error) {
            alert(error.response.data.message);
            console.log("Err", error);
        }
    };

    return (
        <div className="signup-page">

            <div className="signup-card">

                <div className="signup-header">
                    <div className="signup-icon">
                        👤
                    </div>

                    <h1>Create Account</h1>
                    <p>Sign up to get started</p>
                </div>

                <form onSubmit={signUp} className="signup-form">

                    <div className="name-row">

                        <div className="input-group">
                            <label htmlFor="firstName">
                                First Name
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                placeholder="First name"
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                                value={firstName}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="lastName">
                                Last Name
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                placeholder="Last name"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                value={lastName}
                            />
                        </div>

                    </div>

                    <div className="input-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            type="text"
                            placeholder="Enter your phone number"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                            value={phone}
                        />
                    </div>

                    {/* <label className="seller-option">
                        <input
                            type="checkbox"
                            id="role"
                        />

                        <span>
                            Sign up as a Seller
                        </span>
                    </label> */}

                    <button
                        type="submit"
                        className="signup-button"
                    >
                        Create Account
                    </button>

                </form>

                <div className="login-link">
                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Login
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default Signup;