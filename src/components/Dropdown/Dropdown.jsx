import styles from './Dropdown.module.css';
import { deleteTweet, removeReply } from '../../utilities/tweets-api';
import { useNavigate } from 'react-router-dom';

export default function Dropdown({id, refresh, setRefresh}){
    let navigate = useNavigate();
    const handleDelete = async (evt) => {
        const deletedTweet = await deleteTweet(id);
        if(deletedTweet.reply){
            await removeReply(deletedTweet.parent, deletedTweet._id)
        }
        if(deletedTweet.parent) {
            navigate(`/${deletedTweet.parent}`);
        } else {
            navigate(`/`);
        }
        setRefresh(!refresh);
    }

    const handleEdit = (evt) => {
        navigate(`/edit/${id}`);
    }

    return (
        <div>
            <p className={`${styles.dropdown}`}>...</p>
            <button onClick={handleDelete} className={`${styles.dropdownItem}`}>Delete</button>
            <button onClick={handleEdit} className={`${styles.dropdownItem}`}>Edit</button>
        </div>
    )
}