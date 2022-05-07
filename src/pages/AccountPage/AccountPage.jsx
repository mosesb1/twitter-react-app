import { deleteUser } from "../../utilities/users-api";
import { logOut } from "../../utilities/users-service";
import {useState} from 'react';

export default function AccountPage({user, setUser}){
    const [confirmPass, setConfirmPass] = useState({
        password: '',
        confirm: ''
    })

    const [modalClass, setModalClass] = useState(["modal","hidden"]);

    const showDelete = () => {
        setModalClass(["modal"]);
    }

    const handleDeleteChange = (evt) => {
        setConfirmPass({
            ...confirmPass,
            [evt.target.name]: evt.target.value
        })
    }

    const handleDelete = async (evt) => {
        try {
            await deleteUser(user._id);
            logOut();
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    }

    const closeModal = (evt) => {
        setModalClass(["modal","hidden"])
    }

    const disable = confirmPass.password !== confirmPass.confirm;
    return (
        <main>
            <button onClick={showDelete}>Delete Account</button>
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