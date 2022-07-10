import ProfileNavBar from "../../components/ProfileNavBar/ProfileNavBar";
import { useState, useEffect } from "react";
import { findUser } from "../../utilities/users-api";
import { useParams } from "react-router-dom";
import { getUserTweets, getUserTweetsAndReplies, getLikes } from "../../utilities/tweets-api";
import Tweet from "../../components/Tweet/Tweet";

export default function ProfilePage({user, refresh, setRefresh, updateUser, setUpdateUser, searchText}){
    const [displayedUser, setDisplayedUser] = useState(null);
    const [display, setDisplay] = useState('Tweets');
    const [displayedTweets, setDisplayedTweets] = useState([]);

    const params = useParams();
    const id = params.id;

    const getUser = async () => {
        const foundUser = await findUser(id);
        setDisplayedUser(foundUser);
    }

    const filterTweets = (foundTweets) => {
        setDisplayedTweets(foundTweets.map((foundTweet, idx) => {
            if(foundTweet.content.toLowerCase().includes(searchText.toLowerCase())){
                return <Tweet key={idx} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
            }
        }))
    }

    const findTweets = async () => {
        const foundTweets = await getUserTweets(id)
        if(searchText){
            filterTweets(foundTweets);
        } else {
            setDisplayedTweets(foundTweets.map((foundTweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    const findTweetsAndReplies = async () => {
        const foundTweets = await getUserTweetsAndReplies(id);
        if(searchText){
            filterTweets(foundTweets);
        } else {
            setDisplayedTweets(foundTweets.map((foundTweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    const findLikes = async () => {
        const foundTweets = await getLikes(id);
        if(searchText){
            filterTweets(foundTweets);
        } else {
            setDisplayedTweets(foundTweets.map((foundTweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    useEffect(() => {
        getUser();
        if(display === 'Tweets') {
            findTweets();
        } else if (display === 'Likes') {
            findLikes();
        } else {
            findTweetsAndReplies();
        }
    },[display, refresh, searchText])

    const loaded = () => {
        return (
            <main>
                <ProfileNavBar display={display} setDisplay={setDisplay}/>
                {displayedTweets}
            </main>
        )
    }

    const loading = () => {
        return <ProfileNavBar setDisplay={setDisplay}/>
    }

    return displayedTweets.length ? loaded() : loading()
}