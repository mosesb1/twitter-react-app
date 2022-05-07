import {useEffect, useState} from 'react';
import { getThreadById } from '../../utilities/messageThreads-api';
import { createMessage } from '../../utilities/messages-api';

export default function CreateMessage({threadId, user, refresh, setRefresh}){
    const [recipient, setRecipient] = useState('');
    const [messageBody, setMessageBody] = useState({
        sender: user._id,
        receiver: '',
        message: '',
        thread: '',
        error: ''
    });

    const handleChange = (evt) => {
        setMessageBody({
            ...messageBody,
            [evt.target.name]: evt.target.value
        })
    }

    const getThread = async () => {
        try {
            const foundThread = await getThreadById(threadId);
            setRecipient(user._id === foundThread.userOne ? foundThread.userTwo : foundThread.userOne);
        } catch (err) {
            console.error(err);
        }
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const formData = {...messageBody};
            delete formData.error;
            formData.receiver = recipient;
            formData.thread = threadId;
            try {
                const createdMessage = await createMessage(threadId, formData);
                setRefresh(!refresh);
            } catch (err) {
                console.error(err);
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getThread();
    },[threadId])

    return (
        <div className='message-write'>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Write a message' value={messageBody.message} name='message' onChange={handleChange}/>
                <input type='submit' value='Send' />
            </form>
        </div>
    )
}