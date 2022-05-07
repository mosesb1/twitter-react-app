import styles from './ProfileNavBar.module.css';

export default function ProfileNavBar({setDisplay, display}){

    const handleClick = (evt) => {
        setDisplay(evt.target.textContent);
    }
    return (
        <div className={styles.profileNavBar}>
                <button className={display === "Tweets" ? `${styles.navBtn} ${styles.active}` : styles.navBtn} onClick={handleClick}>Tweets</button>
                <button className={display === "Tweets & replies" ? `${styles.navBtn} ${styles.active}` : styles.navBtn} onClick={handleClick}>{"Tweets & replies"}</button>
                <button className={display === "Likes" ? `${styles.navBtn} ${styles.active}` : styles.navBtn} onClick={handleClick}>Likes</button>
        </div>
    )
}