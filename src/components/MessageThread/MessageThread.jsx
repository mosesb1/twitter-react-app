import { useState, useEffect } from "react";
import { findUser } from "../../utilities/users-api";

export default function MessageThread({setThreadId, user, id, userOne, userTwo, setRefresh, refresh}){
    const [username, setUsername] = useState('');

    const getUsername = async () => {
        try {
            let input = user._id === userOne ? userTwo : userOne;
            const foundUser = await findUser(input);
            setUsername(foundUser.username);
        } catch (err) {
            console.error(err);
        }
    }

    const handleClick = (evt) => {
        setThreadId(id);
        setRefresh(!refresh);
    }

    useEffect(() => {
        getUsername();
    },[])

    const loaded = () => {
        return (
            <button onClick={handleClick}>
                {username}
            </button>
        )
    }

    const loading = () => {
        return
    }

    return username ? loaded() : loading()
}