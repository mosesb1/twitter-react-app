import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTweet } from "../../utilities/tweets-api";
import Tweet from "../../components/Tweet/Tweet";

export default function ShowPage(){
    const [tweet, setTweet] = useState([]);
    const params = useParams();
    const id = params.id;

    const findTweet = async () => {
        const foundTweet = await getTweet(id);
        setTweet([<Tweet id={foundTweet._id} img={foundTweet.image} likes={foundTweet.likes} replies={foundTweet.replies} handle={foundTweet.username} name={foundTweet.username} text={foundTweet.content}/>])
    }

    useEffect(() => {
        findTweet();
    },[])
    const loaded = () => {
        return <div>{tweet}</div>
    }
    const loading = () => {
        return <h1>Loading ...</h1>
    }

    return tweet.length ? loaded() : loading()
}