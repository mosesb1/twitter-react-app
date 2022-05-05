import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTweet, editTweet } from '../../utilities/tweets-api';
import axios from 'axios';

export default function EditPage(props){
    const [files, setFiles] = useState([]);
    const [body, setBody] = useState({
        content: '',
        user: '',
        reply: '',
        img: '',
        error: ''
    });

    let navigate = useNavigate();
    const params = useParams();
    const id = params.id;

    const findTweet = async () => {
        try {
            const foundTweet = await getTweet(id);
            setBody({
                content: foundTweet.content,
                user: foundTweet.user,
                reply: foundTweet.reply,
                img: foundTweet.img
            })
        } catch (err) {
            setBody({error: "Couldn't find tweet"})
        }
    }

    useEffect(() => {
        findTweet();
    }, [])

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
            const editedTweet = await editTweet(id, tweetBody);
            navigate(`/${editedTweet._id}`);
        } catch(err) {
            setBody({error: 'Creation failed - try again'})
        }
    }

    const loaded = () => {
        return (
            <form onSubmit={onSubmit}>
                <textarea placeholder="What's happening?" name="content" onChange={handleChange} defaultValue={body.content}/>
                <input type='file' name="img" onChange={handleFiles} />
                <button type="button" onClick={imageUpload}>Upload Image</button>
                <input type="submit" value="tweet" />
            </form>
        )
    }

    const loading = () => {
        return <h1>Loading ...</h1>
    }
    return body.content ? loaded() : loading()
}