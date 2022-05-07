import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../LogInPage/LogInPage";
import { useState } from "react";

export default function AuthPage({setUser}){
    const [showLogin, setShowLogin] = useState(true)
    return (
        <main>
            <img className="login-img" src='https://static.dezeen.com/uploads/2012/06/dezeen_twitter-bird.gif' alt='twitter logo'/>
            <div className='login-page'>
                {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
                <button className="login-btn" onClick={() => setShowLogin(!showLogin)}>{showLogin ? "To SignUp" : "To Login"}</button>
            </div>
        </main>
    )
}