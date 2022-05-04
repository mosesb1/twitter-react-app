import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTweet, getReplies } from "../../utilities/tweets-api";
import Tweet from "../../components/Tweet/Tweet";

export default function ShowPage(props){
    const [tweet, setTweet] = useState([]);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(true);
    const params = useParams();
    const id = params.id;

    const findTweet = async () => {
        const foundTweet = await getTweet(id);
        setTweet([<Tweet key={0} id={foundTweet._id} img={foundTweet.image} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content}/>])
    }
    const findReplies = async () => {
        const foundReplies = await getReplies(id);
        if(!foundReplies.length){
            setShowReplies(false)
            setReplies(["null"])
            return
        }
        setReplies(foundReplies.map((reply, idx) => {
            return (
                <Tweet key={idx+1} id={reply._id} img={reply.image} likes={reply.likes} replies={reply.replies} user={reply.user} text={reply.content}/>
            )
        }))
    }

    useEffect(() => {
        findTweet();
        findReplies();
    },[id])
    const loaded = () => {
        return (
            <div>
                {tweet}
                {showReplies && replies}
            </div>
        )
    }
    const loading = () => {
        return <h1>Loading ...</h1>
    }

    return tweet.length && replies.length ? loaded() : loading()
}