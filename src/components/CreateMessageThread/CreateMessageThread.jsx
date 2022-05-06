import {useState, useEffect} from 'react';
import { findUserByName } from '../../utilities/users-api';
import { createThread } from '../../utilities/messageThreads-api';

export default function CreateMessageThread({user, refresh, setRefresh}){
    const [input, setInput] = useState('');
    const [disable, setDisable] = useState(true);
    const [target, setTarget] = useState(null);

    const handleChange = (evt) => {
        setInput(evt.target.value);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try{
            const thread = await createThread(user._id, target[0]._id);
            setRefresh(!refresh);
        } catch (err) {
            console.error(err);
        }
        
    }

    const handleClick = async (evt) => {
        try {
            const foundUser = await findUserByName(input);
            setTarget(foundUser);
            setDisable(false);
        } catch (err) {
            console.error(err);
            setDisable(true);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='userTwo' value={input} onChange={handleChange} />
            <button type='button' onClick={handleClick}>Confirm User</button>
            <input type='submit' value='Create Thread' disabled={disable}/>
        </form>
    )
}