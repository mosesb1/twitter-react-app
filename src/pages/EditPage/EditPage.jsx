import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTweet, editTweet } from '../../utilities/tweets-api';
import Tweet from '../../components/Tweet/Tweet';
import axios from 'axios';

export default function EditPage({user,refresh, setRefresh, updateUser, setUpdateUser}){
    const [files, setFiles] = useState([]);
    const [tweet, setTweet] = useState([]);
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
            setTweet([<Tweet key={0} currentUser={user} date={foundTweet.createdAt} id={foundTweet._id} img={foundTweet.img} likes={foundTweet.likes} replies={foundTweet.replies} user={foundTweet.user} text={foundTweet.content} reply={foundTweet.reply} setRefresh={setRefresh} refresh={refresh} updateUser={updateUser} setUpdateUser={setUpdateUser}/>])
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

    const doNothing = () => {
        return
    }

    const loaded = () => {
        return (
            <div>
                <h3 className='header'>Edit your tweet</h3>
                <form className="create-tweet" onSubmit={onSubmit}>
                    <textarea className="tweet-text" placeholder="What's happening?" name="content" onChange={handleChange} defaultValue={body.content}/>
                    <div className='create-btns'>
                        <label className="custom-file-upload">
                            <i className="fa-solid fa-paperclip-vertical"></i>
                            <input className='file-input' type='file' name="img" onChange={handleFiles} />
                        </label>
                        <button type="button" className='upload-img' onClick={body.img ? doNothing : imageUpload}>{body.img ? "Image Uploaded" : "Upload Image"}</button>
                        <input className="tweet-btn" type="submit" value="tweet" />
                    </div>
                </form>
                {tweet}
            </div>
        )
    }

    const loading = () => {
        return
    }
    return tweet.length && body.content ? loaded() : loading()
}