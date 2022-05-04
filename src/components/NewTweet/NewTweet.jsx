import './NewTweet.module.css';
import { useState } from 'react';
import { createTweet } from '../../utilities/tweets-api';

export default function NewTweet({user}){
    const [body, setBody] = useState({
        content: '',
        user: user._id,
        error: ''
    });

    const handleChange = (evt) => {
        setBody({
            ...body,
            [evt.target.name]: evt.target.value
        });
    }
    const onSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const tweetBody = {...body};
            delete tweetBody.error;
            const createdTweet = await createTweet(tweetBody);
        } catch(err) {
            setBody({error: 'Creation failed - try again'})
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea placeholder="What's happening?" name="content" onChange={handleChange} value={body.content}/>
            <input type="submit" value="tweet" />
        </form>
    )
}