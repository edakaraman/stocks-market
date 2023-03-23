import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Auth.css"

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [direction, setDirection] = useState(false);

  const login = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    setDirection(true);
  };
  return (
    <div className="input-form">
        <h2> Login Page </h2>
      <input
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email..."
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password..."
      />
      {direction && <Navigate to="/home" replace={true} />}
      <button onClick={login}> Login </button>
    </div>
  );
};
