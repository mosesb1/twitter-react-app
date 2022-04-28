import TweetBtn from "../TweetBtn/TweetBtn";
import Icon from "../Icon/Icon";
import './NavBar.module.css';

export default function NavBar(props) {
    return (
        <nav>
            <ul>
                <li>
                    <Icon icon="fa-solid fa-house-user"/>
                    Home
                </li>
                <li>
                    <Icon icon="fa-solid fa-hashtag"/>
                    Explore
                </li>
                <li>
                    <Icon icon="fa-solid fa-bell"/>
                    Notifications
                </li>
                <li>
                    <Icon icon="fa-solid fa-envelope"/>
                    Messages
                </li>
                <li>
                    <Icon icon="fa-solid fa-bookmark"/>
                    Bookmarks
                </li>
                <li>
                    <Icon icon="fa-solid fa-memo"/>
                    Lists
                </li>
                <li>
                    <Icon icon="fa-solid fa-user"/>
                    Profile
                </li>
                <li>
                    <Icon icon="fa-solid fa-circle-ellipsis"/>
                    More
                </li>
                <TweetBtn/>
            </ul>
        </nav>
    )
}