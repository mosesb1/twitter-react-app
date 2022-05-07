import { logOut } from "../../utilities/users-service";

export default function LogOut({user, setUser}){
    const handleLogOut = () => {
        logOut();
        localStorage.removeItem('token');
        setUser(null);
    }
    
    return (
        <button className='logout-btn' onClick={handleLogOut}>Log Out</button>
    )
}