import './Tweet.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findUser } from '../../utilities/users-api';
import Dropdown from '../Dropdown/Dropdown';

export default function Tweet({img, id, user, text, date, profileImg, replies, likes}) {
    const [username, setUsername] = useState(null)

    const getUserName = async () => {
        const foundUser = await findUser(user);
        setUsername(foundUser.username);
    }

    useEffect(() => {
        getUserName();
    },[])

    const loaded = () => {
        return (
            <Link to={`/${id}`}>
                <div className="tweet-wrap">
                    <div className="tweet-header">
                        {profileImg && <img src={profileImg} alt="" className="avator"/>}
                        <div className="tweet-header-info">
                            {username} <span>@{username}</span>{date && <span>{date}</span>}
                            <p>{text}</p>
                        </div>
                    </div>
                    <div className="tweet-img-wrap">
                        {img && <img src={img} alt="" className="tweet-img"/>}
                    </div>
                    <Dropdown />
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
                            <div className="comment-count">{replies.length}</div>
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
                            <div className="retweet-count">397</div>
                        </div>
                        <div className="likes">
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
                            <div className="likes-count">{likes.length}</div>
                        </div>
                        <div className="message">
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
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
    const loading = () => {
        return <h1>Loading ...</h1>
    }

    return username ? loaded() : loading();
}