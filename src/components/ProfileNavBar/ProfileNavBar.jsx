import styles from './ProfileNavBar.module.css';

export default function ProfileNavBar({setDisplay}){

    const handleClick = (evt) => {
        setDisplay(evt.target.textContent);
    }
    return (
        <nav>
            <ul className={styles.profileNav}>
                <li><button onClick={handleClick}>Tweets</button></li>
                <li><button onClick={handleClick}>{"Tweets & replies"}</button></li>
                <li><button onClick={handleClick}>Likes</button></li>
            </ul>
        </nav>
    )
}