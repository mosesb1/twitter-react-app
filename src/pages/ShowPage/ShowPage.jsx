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
        setTweet([<Tweet key={0} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>])
        console.log(foundTweet.replies)
        if(foundTweet.replies){
            setShowReplies(true)
            setReplies(foundTweet.replies.map((reply, idx) => {
                console.log(reply)
                return (
                    <Tweet key={idx+1} currentUser={user} tweet={reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        } else {
            setShowReplies(false)
        }
    }
    // const findReplies = async () => {
    //     const foundReplies = await getReplies(id);
    //     if(!foundReplies.length){
    //         setShowReplies(false)
    //         setReplies(["null"])
    //         return
    //     }
    //     setReplies(foundReplies.map((reply, idx) => {
    //         return (
    //             <Tweet key={idx+1} currentUser={user} tweet={reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
    //         )
    //     }))
    // }

    useEffect(() => {
        findTweet();
    },[id, refresh])
    const loaded = () => {
        return (
            <div>
                <NewTweet text="Reply to this tweet" user={user} reply={true} id={id} setRefresh={setRefresh} refresh={refresh}/>
                {tweet}
                {showReplies && replies}
            </div>
        )
    }
    const tweetLoaded = () => {
        return (
            <div>
                <NewTweet text="Reply to this tweet" user={user} reply={true} id={id} setRefresh={setRefresh} refresh={refresh}/>
                {tweet}
            </div>
        )
    }

    const loading = () => {
        <NewTweet text="Reply to this tweet" user={user} reply={true} id={id} setRefresh={setRefresh} refresh={refresh}/>
    }

    return tweet.length && replies.length ? loaded() : tweet.length ? tweetLoaded() : loading()
}