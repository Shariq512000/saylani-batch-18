import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link } from "react-router";
import { GlobalContext } from '../context/Context';

const Signup = () => {
    let { state } = useContext(GlobalContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const signUp = async (e) => {
        e.preventDefault();
        console.log('document.getElementById("role").checked', document.getElementById("role").checked)
        try {
            const apiRes = await axios.post(`${state.baseUrl}/signup`, {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phone": phone,
                "isSeller": document.getElementById("role").checked
            })
            alert(apiRes.data.message)
        } catch (error) {
            alert(error.response.data.message)
            console.log("Err", error)
        }
    }

    return (
        <div>
            <form onSubmit={signUp}>
                <label htmlFor="">
                    First Name: <input type="text" onChange={(e) => { setFirstName(e.target.value) }} value={firstName} />
                </label>
                <br />
                <label htmlFor="">
                    Last Name: <input type="text" onChange={(e) => { setLastName(e.target.value) }} value={lastName} />
                </label>
                <br />
                <label htmlFor="">
                    Email: <input type="email" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </label>
                <br />
                <label htmlFor="">
                    Password: <input type="text" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </label>
                <br />
                <label htmlFor="">
                    Phone: <input type="text" onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                </label>
                <br />
                <label htmlFor="">
                    Signup as Seller: <input type="checkbox" id="role" />
                </label>
                <br />
                <button>Submit</button>
            </form>

            <Link to="/login">Go To Login Page</Link>
        </div>
    )
}

export default Signup