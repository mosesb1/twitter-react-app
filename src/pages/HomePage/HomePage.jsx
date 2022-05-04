import axios from 'axios';
import { getAll } from '../../utilities/tweets-api';
import Tweet from '../../components/Tweet/Tweet.jsx';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [tweets, setTweets] = useState([])
    const getTweets = async () => {
        const foundTweets = await getAll();
        setTweets(foundTweets.map((foundTweet, idx) => {
            return (
                <Tweet key={idx} id={foundTweet._id} img={foundTweet.image} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content}/>
            )
        }))
    }

    const loaded = () => {
        return <main>{tweets}</main>
    }

    const loading = () => {
        return <h1>Loading ...</h1>
    }

    useEffect(() => {
        getTweets();
    }, [])
    return tweets.length ? loaded() : loading()
}