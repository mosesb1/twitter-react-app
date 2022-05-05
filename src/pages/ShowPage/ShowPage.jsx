import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getTweet, getReplies } from "../../utilities/tweets-api";
import Tweet from "../../components/Tweet/Tweet";
import NewTweet from "../../components/NewTweet/NewTweet";

export default function ShowPage({user, refresh, setRefresh, updateUser, setUpdateUser}){
    const [tweet, setTweet] = useState([]);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(true);
    const params = useParams();
    const id = params.id;

    const findTweet = async () => {
        const foundTweet = await getTweet(id);
        setTweet([<Tweet key={0} currentUser={user} id={foundTweet._id} img={foundTweet.img} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content} reply={foundTweet.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>])
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
                <Tweet key={idx+1} currentUser={user} id={reply._id} img={reply.img} likes={reply.likes} replies={reply.replies} user={reply.user} text={reply.content} reply={reply.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
            )
        }))
    }

    useEffect(() => {
        setShowReplies(true);
        findTweet();
        findReplies();
    },[id, refresh])
    const loaded = () => {
        return (
            <div>
                <NewTweet user={user} reply={true} id={id} setRefresh={setRefresh} refresh={refresh}/>
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