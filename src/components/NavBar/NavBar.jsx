import TweetBtn from "../TweetBtn/TweetBtn";
import Icon from "../Icon/Icon";
import './NavBar.module.css';
import { Link } from "react-router-dom";

export default function NavBar({user}) {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>
                        <Icon icon="fa-solid fa-house-user"/>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to='/explore'>
                        <Icon icon="fa-solid fa-hashtag"/>
                        Explore
                    </Link>
                </li>
                <li>
                    <Icon icon="fa-solid fa-bell"/>
                    Notifications
                </li>
                <li>
                    <Link to='/messages'>
                        <Icon icon="fa-solid fa-envelope"/>
                        Messages
                    </Link>
                </li>
                <li>
                    <Link to='/bookmarks'>
                        <Icon icon="fa-solid fa-bookmark"/>
                        Bookmarks
                    </Link>
                </li>
                <li>
                    <Link to='/lists'>
                        <Icon icon="fa-solid fa-memo"/>
                        Lists
                    </Link>
                </li>
                <li>
                    <Link to={`/user/${user._id}`}>
                        <Icon icon="fa-solid fa-user"/>
                        Profile
                    </Link>
                </li>
                <li>
                    <Link to='/account'>
                        <Icon icon="fa-solid fa-gear"/>
                        Account
                    </Link>
                </li>
                <TweetBtn/>
            </ul>
        </nav>
    )
}