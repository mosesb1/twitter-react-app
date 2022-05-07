import { deleteUser, changeUsername, changeEmail, changePassword } from "../../utilities/users-api";
import { logOut } from "../../utilities/users-service";
import {useState} from 'react';

export default function AccountPage({user, setUser, updateUser, setUpdateUser}){
    const [confirmPass, setConfirmPass] = useState({
        password: '',
        confirm: ''
    })

    const [newUsername, setNewUsername] = useState({username: ''});
    const [newEmail, setNewEmail] = useState({email: ''});
    const [newPassword, setNewPassword] = useState({
        oldPassword: '',
        password: '',
        confirm: ''
    })

    const [modalClass, setModalClass] = useState(["modal","hidden"]);

    const handleUsernameChange = (evt) => {
        setNewUsername({[evt.target.name]: evt.target.value});
    }

    const handleEmailChange = (evt) => {
        setNewEmail({[evt.target.name]: evt.target.value});
    }

    const showDelete = () => {
        setModalClass(["modal"]);
    }

    const handleDeleteChange = (evt) => {
        setConfirmPass({
            ...confirmPass,
            [evt.target.name]: evt.target.value
        })
    }

    const handlePasswordChange = (evt) => {
        setNewPassword({
            ...newPassword,
            [evt.target.name]: evt.target.value
        })
    }

    const handleEmail = async (evt) => {
        evt.preventDefault();
        try {
            await changeEmail(user._id, newEmail);
            setUpdateUser(!updateUser);
        } catch (err) {
            console.error(err);
        }
    }

    const handleDelete = async (evt) => {
        evt.preventDefault();
        try {
            await deleteUser(user._id);
            logOut();
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    }

    const handleUsername = async (evt) => {
        evt.preventDefault();
        try {
            await changeUsername(user._id, newUsername);
            setUpdateUser(!updateUser);
        } catch (err) {
            console.error(err);
        }
    }

    const handlePassword = async (evt) => {
        evt.preventDefault();
        try {
            await changePassword(user._id, newPassword);
            setUpdateUser(!updateUser);
        } catch (err) {
            console.error(err);
        }
    }

    const closeModal = (evt) => {
        setModalClass(["modal","hidden"])
    }

    const disableChange = newPassword.password !== newPassword.confirm;

    const disable = confirmPass.password !== confirmPass.confirm;
    return (
        <main>
            <button onClick={showDelete}>Delete Account</button>
            <form onSubmit={handleUsername}>
                <input type='text' placeholder="new username" value={newUsername.username} name='username' onChange={handleUsernameChange}/>
                <input type='submit' value='Change Username' />
            </form>
            <form onSubmit={handleEmail}>
                <input type='text' placeholder="new email" value={newEmail.email} name='email' onChange={handleEmailChange}/>
                <input type='submit' value='Change Email' />
            </form>
            <form onSubmit={handlePassword}>
                <input type='password' placeholder="old password" value={newPassword.oldPassword} name='oldPassword' onChange={handlePasswordChange}/>
                <input type='password' placeholder="new password" value={newPassword.password} name='password' onChange={handlePasswordChange}/>
                <input type='password' placeholder="confirm new password" value={newPassword.confirm} name='confirm' onChange={handlePasswordChange}/>
                <input type='submit' value='Change Password' disabled={disableChange}/>
            </form>
            <div className={modalClass.join(" ")}>
                <div className="modal-content">
                    <div className='modal-top'>
                        <button className="hide">X</button>
                        <h1>Are you sure you wish to delete your account?</h1>
                        <button onClick={closeModal} className="close" type='button'>X</button>
                    </div>
                    <form onSubmit={handleDelete}>
                        <label>Password</label>
                        <input type='password' name='password' onChange={handleDeleteChange}/>
                        <label>Confirm Password</label>
                        <input type='password' name='confirm' onChange={handleDeleteChange} />
                        <input type='submit' value='DELETE' disabled={disable}/>
                    </form>
                </div>
            </div>
        </main>
    )
}