import './NewTweet.module.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { createTweet, createReply } from '../../utilities/tweets-api';
import axios from 'axios';

export default function NewTweet({user, reply, id}){
    const [files, setFiles] = useState([]);
    let navigate = useNavigate();

    const [body, setBody] = useState({
        content: '',
        user: user._id,
        reply: reply ? "true" : "false",
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
            delete tweetBody.error;
            const createdTweet = reply ? await createReply(id, tweetBody) : await createTweet(tweetBody);
            navigate(`/${createdTweet._id}`)
        } catch(err) {
            setBody({error: 'Creation failed - try again'})
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <textarea placeholder="What's happening?" name="content" onChange={handleChange} value={body.content}/>
            <input type='file' name="img" onChange={handleFiles} />
            <button type="button" onClick={imageUpload}>{body.img ? "Image Uploaded" : "Upload Image"}</button>
            <input type="submit" value="tweet" />
        </form>
    )
}