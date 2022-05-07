import { deleteUser } from "../../utilities/users-api";
import { logOut } from "../../utilities/users-service";
import {useNavigate} from 'react-router-dom';

export default function AccountPage({user, setUser}){
    let navigate = useNavigate();
    const handleDelete = async () => {
        try {
            await deleteUser(user._id);
            logOut();
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <main>
            <button onClick={handleDelete}>Delete Account</button>
        </main>
    )
}