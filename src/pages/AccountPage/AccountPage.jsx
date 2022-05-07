import { deleteUser, changeUsername, changeEmail, changePassword, updateUserImg } from "../../utilities/users-api";
import { logOut } from "../../utilities/users-service";
import {useState} from 'react';
import axios from "axios";

export default function AccountPage({user, setUser, updateUser, setUpdateUser}){
    const [files, setFiles] = useState([]);
    const [confirmPass, setConfirmPass] = useState({
        password: '',
        confirm: ''
    })
    const [newAvatar, setNewAvatar] = useState({avatar: ''});

    const [newUsername, setNewUsername] = useState({username: ''});
    const [newEmail, setNewEmail] = useState({email: ''});
    const [newPassword, setNewPassword] = useState({
        oldPassword: '',
        password: '',
        confirm: ''
    })

    const [modalClass, setModalClass] = useState(["modal","hidden"]);

    const imageUpload = (evt) => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'exoxfqfm');

        axios.post("https://api.cloudinary.com/v1_1/dqt9fuamw/image/upload", formData)
            .then((response) => {
                setNewAvatar({avatar: response.data.secure_url});
            })
    }

    const handleFiles = (evt) => {
        setFiles(evt.target.files);
    }

    const handleUsernameChange = (evt) => {
        setNewUsername({[evt.target.name]: evt.target.value});
    }

    const handleEmailChange = (evt) => {
        setNewEmail({[evt.target.name]: evt.target.value});
    }

    const showDelete = () => {
        setModalClass(["modal"]);
    }

    const handleImageSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await updateUserImg(user._id, newAvatar);
            setUpdateUser(!updateUser);
        } catch (err) {
            console.error(err);
        }
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

    const doNothing = () => {
        return
    }

    const disableChange = newPassword.password !== newPassword.confirm;

    const disable = confirmPass.password !== confirmPass.confirm;
    return (
        <main>
            <form onSubmit={handleImageSubmit}>
            <div className='create-btns'>
                <label className="custom-file-upload">
                    <i className="fa-solid fa-paperclip-vertical"></i>
                    <input className='file-input' type='file' name="img" onChange={handleFiles} />
                </label>
                <button type="button" className='upload-img' onClick={newAvatar.avatar ? doNothing : imageUpload}>{newAvatar.avatar ? "Image Uploaded" : "Upload Image"}</button>
                <input type="submit" value="Upload Profile Img" />
            </div>
            </form>
            <form onSubmit={handleUsername}>
                <div className="create-btns">
                    <input type='text' placeholder="new username" value={newUsername.username} name='username' onChange={handleUsernameChange}/>
                    <input type='submit' value='Change Username' />
                </div>
            </form>
            <form onSubmit={handleEmail}>
                <div className="create-btns">
                <input type='text' placeholder="new email" value={newEmail.email} name='email' onChange={handleEmailChange}/>
                <input type='submit' value='Change Email' />
                </div>
            </form>
            <form onSubmit={handlePassword}>
                <div className="create-btns">
                <input type='password' placeholder="old password" value={newPassword.oldPassword} name='oldPassword' onChange={handlePasswordChange}/>
                <input type='password' placeholder="new password" value={newPassword.password} name='password' onChange={handlePasswordChange}/>
                <input type='password' placeholder="confirm new password" value={newPassword.confirm} name='confirm' onChange={handlePasswordChange}/>
                <input type='submit' value='Change Password' disabled={disableChange}/>
                </div>
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
                        <input type='submit' value='DELETE' className='delete' disabled={disable}/>
                    </form>
                </div>
            </div>
            <div className="create-btns">
            <button onClick={showDelete}>Delete Account</button>
            </div>
        </main>
    )
}