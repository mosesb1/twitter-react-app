import './NewTweet.module.css';
import Icon from '../Icon/Icon';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { createTweet, createReply } from '../../utilities/tweets-api';
import axios from 'axios';

export default function NewTweet({user, reply, id, refresh, setRefresh}){
    const [files, setFiles] = useState([]);
    let navigate = useNavigate();

    const [body, setBody] = useState({
        content: '',
        user: user._id,
        reply: reply ? "true" : "false",
        parent: reply ? id : '',
        img: '',
        error: ''
    });

    
    const imageUpload = () => {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'exoxfqfm');

        axios.post("https://api.cloudinary.com/v1_1/dqt9fuamw/image/upload", formData)
            .then((response) => {
                console.log(response);
                setBody({
                    ...body,
                    img: response.data.secure_url
                })
            })
    }
    
    const handleFiles = (evt) => {
        setFiles(evt.target.files);
    }
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
            if(!tweetBody.parent){
                delete tweetBody.parent;
            }
            delete tweetBody.error;
            const createdTweet = reply ? await createReply(id, tweetBody) : await createTweet(tweetBody);
            navigate(`/${createdTweet._id}`)
            setRefresh(!refresh)
        } catch(err) {
            setBody({error: 'Creation failed - try again'})
        }
    }

    const doNothing = () => {
        return;
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea placeholder="What's happening?" name="content" onChange={handleChange} value={body.content}/>
            <input type='file' name="img" onChange={handleFiles} />
            <button type="button" onClick={body.img ? doNothing : imageUpload}>{body.img ? "Image Uploaded ✅" : "Upload Image"}</button>
            <input className="tweet-btn" type="submit" value="tweet" />
        </form>
    )
}