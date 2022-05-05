import ProfileNavBar from "../../components/ProfileNavBar/ProfileNavBar";
import { useState, useEffect } from "react";
import { findUser } from "../../utilities/users-api";
import { useParams } from "react-router-dom";
import { getUserTweets, getUserTweetsAndReplies, getLikes } from "../../utilities/tweets-api";
import Tweet from "../../components/Tweet/Tweet";

export default function ProfilePage({user, refresh, setRefresh}){
    const [displayedUser, setDisplayedUser] = useState(null);
    const [display, setDisplay] = useState('Tweets');
    const [displayedTweets, setDisplayedTweets] = useState([]);

    const params = useParams();
    const id = params.id;

    const getUser = async () => {
        const foundUser = await findUser(id);
        setDisplayedUser(foundUser);
    }

    const findTweets = async () => {
        const foundTweets = await getUserTweets(id)
        setDisplayedTweets(foundTweets.map((tweet, idx) => {
            return (
                <Tweet key={idx} currentUser={user} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh}/>
            )
        }))
    }

    const findTweetsAndReplies = async () => {
        const foundTweets = await getUserTweetsAndReplies(id);
        setDisplayedTweets(foundTweets.map((tweet, idx) => {
            return (
                <Tweet key={idx} currentUser={user} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh}/>
            )
        }))
    }

    const findLikes = async () => {
        const foundTweets = await getLikes(id);
        setDisplayedTweets(foundTweets.map((tweet, idx) => {
            return (
                <Tweet key={idx} currentUser={user} id={tweet._id} img={tweet.img} likes={tweet.likes} replies={tweet.replies} user={tweet.user} text={tweet.content} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh}/>
            )
        }))
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
    },[display])

    const loaded = () => {
        return (
            <main>
                <ProfileNavBar setDisplay={setDisplay}/>
                {displayedTweets}
            </main>
        )
    }

    const loading = () => {
        return <h1>Loading ...</h1>
    }

    return displayedTweets.length ? loaded() : loading()
}