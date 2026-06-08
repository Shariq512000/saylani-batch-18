import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";

const Forget = () => {
    const auth = getAuth();

    const [email, setEmail] = useState("")

    const forgetPass = (e) => {
        e.preventDefault()
        sendPasswordResetEmail(auth, email)
            .then(() => {
                // Password reset email sent!
                // ..
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    return (
        <div className="">
            <h1>Forget Password</h1>
            <form onSubmit={forgetPass}>
                <label htmlFor="">
                    Email: <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                </label>
                <br />
                <button>Send Reset Email</button>
            </form>
        </div>
    )
}

export default Forget;