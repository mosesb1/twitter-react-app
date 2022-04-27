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
        <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" value={form.username} onChange={handleChange} required />
                    <label>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    <label>Confirm</label>
                    <input type="password" name="confirm" value={form.confirm} onChange={handleChange} required />
                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{form.error}</p>
        </div>
    );
}