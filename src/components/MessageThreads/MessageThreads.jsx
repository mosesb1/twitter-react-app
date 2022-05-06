import MessageThread from "../MessageThread/MessageThread";
import { getThreads } from "../../utilities/messageThreads-api";
import {useState, useEffect} from 'react';

export default function MessageThreads({user, refresh, setRefresh, setThreadId}){
    const [threads, setThreads] = useState([]);

    const findThreads = async () => {
        try {
            const foundThreads = await getThreads(user._id);
            setThreads(foundThreads.map((thread, idx) => {
                return (
                    <MessageThread key={idx} setThreadId={setThreadId} user={user} id={thread._id} userOne={thread.userOne} userTwo={thread.userTwo} refresh={refresh} setRefresh={setRefresh}/>
                )
            }))
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        findThreads();
    },[refresh])
    
    const loaded = () => {
        return (
            <div>
                {threads}
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading ...</h1>
    }

    return threads.length ? loaded() : loading()
}