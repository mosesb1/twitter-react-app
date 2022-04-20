import {signUp} from '../../utilities/users-service';
import { useState } from 'react';

export default function SignUpForm(props){
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
    })

    const handleChange = (evt) => {
        setUserInfo({
            ...userInfo,
            [evt.target.name]: evt.target.value,
            error: ''
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try{
            const formData = {...userInfo};
            delete formData.error;
            delete formData.confirm;
            console.log(formData);
            const user = await signUp(formData);
            localStorage.setItem('token', user);
        } catch (error) {
            setUserInfo({error: 'Sign Up Failed'})
        }
    }

    const disable = userInfo.password !== userInfo.confirm;

    return (
        <div>
            <div className='form-container'>
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" value={userInfo.username} onChange={handleChange} required />
                    <label>Email</label>
                    <input type="email" name="email" value={userInfo.email} onChange={handleChange} required />
                    <label>Password</label>
                    <input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
                    <label>Confirm</label>
                    <input type="password" name="confirm" value={userInfo.confirm} onChange={handleChange} required />
                    <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{userInfo.error}</p>
        </div>
    )
}

// import {Component} from 'react';
// import {signUp} from '../../utilities/users-service';

// export default class SignUpForm extends Component {
//     state = {
//         name: '',
//         email: '',
//         password: '',
//         confirm: '',
//         error: ''
//     }

//     handleChange = (evt) => {
//         this.setState({
//             ...this.state,
//             [evt.target.name]: evt.target.value,
//             error: ''
//         });
//     };

//     handleSubmit = async (evt) => {
//         evt.preventDefault();
//         try{
//             const formData = {...this.state};
//             delete formData.error;
//             delete formData.confirm;
//             const user = await signUp(formData);
//             localStorage.setItem('token', user);
//         } catch (error) {
//             this.setState({error: 'Sign up failed'});
//         }
//     }
//     render(){
//         const disable = this.state.password !== this.state.confirm;
//         return (
//             <div>
//                 <div className='form-container'>
//                     <form autoComplete='off' onSubmit={this.handleSubmit}>
//                         <label>Name</label>
//                         <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
//                         <label>Email</label>
//                         <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
//                         <label>Password</label>
//                         <input type='password' name="password" value={this.state.password} onChange={this.handleChange} required /> 
//                         <label>Confirm</label>
//                         <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
//                         <button type="submit" disabled={disable}>SIGN UP</button>
//                     </form>
//                 </div>
//                 <p className="error-message">&nbsp;{this.state.error}</p>
//             </div>
//         )
//     }
// }
