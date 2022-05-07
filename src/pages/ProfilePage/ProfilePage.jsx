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
        const filteredTweets = [];
        foundTweets.map((tweet, idx) => {
            if(tweet.content.toLowerCase().includes(searchText.toLowerCase())){
                filteredTweets.push(<Tweet key={idx} currentUser={user} date={tweet.createdAt} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>)
            }
        })
        setDisplayedTweets(filteredTweets)
    }

    const findTweets = async () => {
        const foundTweets = await getUserTweets(id)
        if(searchText){
            filterTweets(foundTweets);
        } else {
            setDisplayedTweets(foundTweets.map((tweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} date={tweet.createdAt} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    const findTweetsAndReplies = async () => {
        const foundTweets = await getUserTweetsAndReplies(id);
        if(searchText){
            filterTweets(foundTweets);
        } else {
            setDisplayedTweets(foundTweets.map((tweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} date={tweet.createdAt} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    const findLikes = async () => {
        const foundTweets = await getLikes(id);
        if(searchText){
            filterTweets(foundTweets);
        } else {
            setDisplayedTweets(foundTweets.map((tweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} date={tweet.createdAt} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
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
                <ProfileNavBar setDisplay={setDisplay}/>
                {displayedTweets}
            </main>
        )
    }

    const loading = () => {
        return <ProfileNavBar setDisplay={setDisplay}/>
    }

    return displayedTweets.length ? loaded() : loading()
}