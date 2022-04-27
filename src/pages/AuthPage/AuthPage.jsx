import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../LogInPage/LogInPage";
import { useState } from "react";

export default function AuthPage({setUser}){
    const [showLogin, setShowLogin] = useState(true)
    return (
        <main>
            <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? "SIGNUP" : "LOGIN"}</h3>
            {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
        </main>
    )
}