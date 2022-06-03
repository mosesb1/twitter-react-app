import './Tweet.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findUser, userLike, userRemoveLike, follow, removeFollow, bookmark, removeBookmark } from '../../utilities/users-api';
import { tweetLike, tweetRemoveLike, bookmarkTweet, removeBookmarkTweet, getTweet } from '../../utilities/tweets-api';
import Dropdown from '../Dropdown/Dropdown';

export default function Tweet({currentUser, tweet, refresh, setRefresh, updateUser, setUpdateUser}) {
    if(tweet._id === '627677b755111bc810cb3d55'){
        console.log('yes')
    }
    const handleLike = async (evt) => {
        await tweetLike(tweet._id, currentUser._id);
        await userLike(currentUser._id, tweet._id);
        setUpdateUser(!updateUser);
        setRefresh(!refresh);
    }

    const removeLike = async (evt) => {
        await tweetRemoveLike(tweet._id, currentUser._id);
        await userRemoveLike(currentUser._id, tweet._id);
        setUpdateUser(!updateUser);
        setRefresh(!refresh);
    }

    const handleFollow = async (evt) => {
        if(tweet.user.followers.includes(currentUser._id)){
            await removeFollow(currentUser._id, tweet.user);
            setUpdateUser(!updateUser);
            setRefresh(!refresh);
        } else {
            await follow(currentUser._id, tweet.user);
            setUpdateUser(!updateUser);
            setRefresh(!refresh);
        }
    }

    const handleBookmark = async (evt) => {
        if(tweet.bookmarks.includes(currentUser._id)){
            await removeBookmark(currentUser._id, tweet._id);
            await removeBookmarkTweet(tweet._id, currentUser._id);
            setUpdateUser(!updateUser);
            setRefresh(!refresh);
        } else {
            await bookmark(currentUser._id, tweet._id);
            await bookmarkTweet(tweet._id, currentUser._id);
            setUpdateUser(!updateUser);
            setRefresh(!refresh);
        }
    }
    

    const loaded = () => {
        return (
                <div className="tweet-wrap">
                    <div className="tweet-header">
                        {tweet.user.avatar && <img src={tweet.user.avatar} alt="" className="avatar"/>}
                        <div className="tweet-header-info">
                            <Link to={`/user/${tweet.user}`} style={{ textDecoration: 'none', color: "black" }}>{tweet.user.username} <span>@{tweet.user.username}</span></Link>{tweet.createdAt && <span>{tweet.createdAt.slice(0,10)}</span>}<Dropdown currentUser={currentUser} user={tweet.user} tweeter={tweet.user} parent={tweet.parent ? tweet.parent._id : ""} handleFollow={handleFollow} handleBookmark={handleBookmark} tweet={tweet} id={tweet._id} reply={tweet.reply} setRefresh={setRefresh} refresh={refresh}/>
                            <Link to={`/${tweet._id}`} style={{ textDecoration: 'none', color: "black" }}>
                                <p className="tweet-content">{tweet.content}</p>
                            </Link>
                        </div>
                    </div>
                    <Link to={`/${tweet._id}`}>
                        <div className="tweet-img-wrap">
                            {tweet.img && <img src={tweet.img} alt="" className="tweet-img"/>}
                        </div>
                    </Link>
                    <div className="tweet-info-counts">
                        <div className="comments">
                            <svg className="feather feather-message-circle sc-dnqmqq jxshSx" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                aria-hidden="true">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <div className="comment-count">{tweet.replies.length}</div>
                        </div>
                        <div className="retweets">
                            <svg className="feather feather-repeat sc-dnqmqq jxshSx" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                aria-hidden="true">
                                    <polyline points="17 1 21 5 17 9"></polyline>
                                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                                    <polyline points="7 23 3 19 7 15"></polyline>
                                    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
                            </svg>
                            <div className="retweet-count">0</div>
                        </div>
                        <div className="likes">
                            <button className="like-btn" onClick={tweet.likes.includes(currentUser._id) ? removeLike : handleLike}>
                                <svg className="feather feather-heart sc-dnqmqq jxshSx"
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    aria-hidden="true">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                </svg>
                            </button>
                            <div className="likes-count">{tweet.likes.length}</div>
                        </div>
                        {/* <div className="message">
                            <svg className="feather feather-send sc-dnqmqq jxshSx" 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="20" 
                                height="20" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                aria-hidden="true">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </div> */}
                    </div>
                </div>
        )
    }
    const loading = () => {
        return
    }

    return tweet.user.username && tweet.user && tweet ? loaded() : loading();
}