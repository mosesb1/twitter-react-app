import { Component } from "react";
import { signUp } from '../../utilities/users-service';
import { useState } from "react";

export default function SignUpForm({setUser}) {
    const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
    });

    const handleChange = (evt) => {
        setForm({
            ...form,
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const formData = {...form};
            delete formData.confirm;
            delete formData.error;
            // The promise returned by the signUp service method
            // will resolve to the user object included in the
            // payload of the JSON Web Token (JWT)
            const user = await signUp(formData);
            console.log(user)
            // Baby step
            setUser(user);
        } catch {
            // An error happened on the server
            setForm({ error: 'Sign Up Failed - Try Again' });
        }
    };

    // We must override the render method
    // The render method is the equivalent to a function-based component
    // (its job is to return the UI)

    const disable = form.password !== form.confirm;
    return (
        <div className="container">
            <div className="form-container">
                <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
                    <h3>Sign Up</h3>
                    <label>
                        Username
                        <input type="text" name="username" value={form.username} onChange={handleChange} required />
                    </label>
                    <label>
                        Email
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </label>
                    <label>
                        Password
                        <input className={form.password.length < 8 ? "red-border" : "green"} type="password" name="password" value={form.password} onChange={handleChange} required />
                    </label>
                    <label>
                        Confirm
                        <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
                    </label>
                    <button className='login-submit' type="submit" disabled={disable}>SIGN UP</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{form.error}</p>
        </div>
    );
}