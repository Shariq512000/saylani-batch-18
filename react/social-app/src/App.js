import "./App.css";
import { initializeApp } from "firebase/app";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBSF6Rg9ST3BykoqsT91s80NXOmGtb8rY0",
    authDomain: "social-app-4ea7d.firebaseapp.com",
    projectId: "social-app-4ea7d",
    storageBucket: "social-app-4ea7d.firebasestorage.app",
    messagingSenderId: "173041482743",
    appId: "1:173041482743:web:ae324fe02f696b9b538cf2",
  };

  const app = initializeApp(firebaseConfig);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
