import { findUser } from "../../utilities/users-api";
import {useState, useEffect} from 'react';

export default function Message({text, classNames, user, sender, receiver}){
    const [username, setUsername] = useState('');

    const getUsername = async () => {
        let userId = sender === user.user_id ? receiver : sender;
        try {
            const foundUser = await findUser(userId);
            setUsername(foundUser.username);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getUsername();
    },[])

    const loaded = () => {
        return (
            <div className={classNames.join(" ")}>
                <h3>{sender === user.user_id ? user.username : username}</h3>
                {text}
            </div>
        )
    }

    const loading = () => {
        return
    }

    return username ? loaded() : loading()
}