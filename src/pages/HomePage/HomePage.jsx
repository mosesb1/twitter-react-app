import axios from 'axios';
import { getAll } from '../../utilities/tweets-api';
import Tweet from '../../components/Tweet/Tweet.jsx';
import { useEffect, useState } from 'react';
import NewTweet from '../../components/NewTweet/NewTweet';

export default function HomePage({user}) {
    const [tweets, setTweets] = useState([])
    const getTweets = async () => {
        const foundTweets = await getAll();
        setTweets(foundTweets.map((foundTweet, idx) => {
            return (
                <Tweet key={idx} currentUser={user} id={foundTweet._id} img={foundTweet.img} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content} reply={foundTweet.reply}/>
            )
        }))
    }

    const loaded = () => {
        return (
            <main>
                <NewTweet user={user} reply={false} />
                {tweets}
            </main>
        )
    }

    const loading = () => {
        return <h1>Loading ...</h1>
    }

    useEffect(() => {
        getTweets();
    }, [])
    return tweets.length ? loaded() : loading()
}