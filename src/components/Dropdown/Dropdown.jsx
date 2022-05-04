import styles from './Dropdown.module.css';
import { deleteTweet, removeReply } from '../../utilities/tweets-api';
import { useNavigate } from 'react-router-dom';

export default function Dropdown({id}){
    let navigate = useNavigate();
    const handleDelete = async (evt) => {
        const deletedTweet = await deleteTweet(id);
        await removeReply(deletedTweet.parent, deletedTweet._id)
        navigate('/');
    }
    return (
        <div>
            <p className={`${styles.dropdown}`}>...</p>
            <button onClick={handleDelete} className={`${styles.dropdownItem}`}>Delete</button>
            <button className={`${styles.dropdownItem}`}>Edit</button>
        </div>
    )
}