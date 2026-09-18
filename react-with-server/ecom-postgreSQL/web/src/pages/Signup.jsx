import React, { useState } from 'react';
import axios from "axios";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const apiRes = await axios.post("http://localhost:5000/signup", {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
                "phone": phone
            })
            alert(apiRes.data.message)
        } catch (error) {
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
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Signup