import axios from 'axios';
import { getAll } from '../../utilities/tweets-api';
import Tweet from '../../components/Tweet/Tweet.jsx';
import { useEffect, useState } from 'react';
import NewTweet from '../../components/NewTweet/NewTweet';

export default function ExplorePage({user, refresh, setRefresh, updateUser, setUpdateUser, searchText}) {
    const [tweets, setTweets] = useState([])
    const getTweets = async () => {
        const foundTweets = await getAll();
        if(searchText){
            const filteredTweets = [];
            foundTweets.forEach((foundTweet, idx) => {
                if(foundTweet.content.toLowerCase().includes(searchText.toLowerCase())){
                    filteredTweets.push(<Tweet key={idx} currentUser={user} id={foundTweet._id} img={foundTweet.img} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content} reply={foundTweet.reply} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>)
                }
            })
            setTweets(filteredTweets);
        } else {
            setTweets(foundTweets.map((foundTweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} id={foundTweet._id} img={foundTweet.img} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content} reply={foundTweet.reply} refresh={refresh} setRefresh={setRefresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    const loaded = () => {
        return (
            <main>
                <NewTweet user={user} reply={false} refresh={refresh} setRefresh={setRefresh} />
                {tweets}
            </main>
        )
    }

    const loading = () => {
        return <NewTweet user={user} reply={false} refresh={refresh} setRefresh={setRefresh} />
    }

    useEffect(() => {
        getTweets();
    }, [refresh, searchText])
    return tweets.length ? loaded() : loading()
}