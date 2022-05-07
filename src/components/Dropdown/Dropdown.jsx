import styles from './Dropdown.module.css';
import { deleteTweet, removeReply } from '../../utilities/tweets-api';
import { useNavigate } from 'react-router-dom';

export default function Dropdown({id, refresh, setRefresh, currentUser, user, tweeter, tweet, handleBookmark, handleFollow, parent}){
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

    const handleParent = (evt) => {
        navigate(`/${parent}`);
    }

    return (
        <div className={`${styles.dropdown}`}>
            <button>...</button>
            <div className={`${styles.dropdownContent}`}>
                {user !== currentUser._id && <button onClick={handleFollow} className='follow-btn'>{tweeter.followers.includes(currentUser._id) ? "Unfollow" : "Follow"}</button>}
                <button onClick={handleBookmark} className="bookmark-btn">{tweet.bookmarks.includes(currentUser._id) ? "Remove Bookmark" : "Bookmark"}</button>
                {parent && <button onClick={handleParent} className='parent-btn'>Go to Parent</button>}
                {user === currentUser._id && <button onClick={handleDelete} className={`${styles.dropdownItem}`}>Delete</button>}
                {user === currentUser._id && <button onClick={handleEdit} className={`${styles.dropdownItem}`}>Edit</button>}
            </div>
        </div>
    )
}