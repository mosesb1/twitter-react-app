import { getBookmarkPage } from '../../utilities/tweets-api';
import Tweet from '../../components/Tweet/Tweet.jsx';
import { useEffect, useState } from 'react';
import NewTweet from '../../components/NewTweet/NewTweet';

export default function BookMarkPage({user, refresh, setRefresh, updateUser, setUpdateUser, searchText}) {
    const [tweets, setTweets] = useState([])
    const getTweets = async () => {
        const foundTweets = await getBookmarkPage(user._id);
        if(searchText){
            setTweets(foundTweets.map((foundTweet,idx) => {
                if(foundTweet.content.toLowerCase().includes(searchText.toLowerCase())){
                    return <Tweet key={idx} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                }
                }
            ))

        } else {
            setTweets(foundTweets.map((foundTweet, idx) => {
                return (
                    <Tweet key={idx} currentUser={user} tweet={foundTweet} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>
                )
            }))
        }
    }

    const loaded = () => {
        return (
            <main>
                <h3 className='header'>Bookmarks</h3>
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