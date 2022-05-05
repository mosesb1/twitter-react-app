import styles from './ProfileNavBar.module.css';

export default function ProfileNavBar(props){
    return (
        <nav>
            <ul className={styles.profileNav}>
                <li><button>Tweets</button></li>
                <li><button>{"Tweets & replies"}</button></li>
                <li><button>Likes</button></li>
            </ul>
        </nav>
    )
}