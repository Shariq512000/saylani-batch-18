import axios from "axios";
import { useContext, useState } from "react";
import { GlobalContext } from "../context/Context";

function Login() {

    const { dispatch } = useContext(GlobalContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const apiRes = await axios.post('https://dummyjson.com/auth/login', { username: username, password: password });
            // console.log("Res", apiRes.data)
            dispatch({ type: "USER_LOGIN", user: apiRes.data })
            localStorage.setItem("userToken", apiRes.data.accessToken)
        } catch (error) {
            console.log("Err", error)
        }

    };

    return (
        <div className="container">
            <form className="login-box" onSubmit={handleLogin}>
                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;