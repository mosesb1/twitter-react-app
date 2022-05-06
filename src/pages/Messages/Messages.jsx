import MessageThreads from "../../components/MessageThreads/MessageThreads";
import MessageBox from "../../components/MessageBox/MessageBox";
import CreateMessageThread from "../../components/CreateMessageThread/CreateMessageThread";
import { useState, useEffect } from "react";

export default function Messages({user, refresh, setRefresh}){
    const [threadId, setThreadId] = useState(null);

    useEffect(() => {

    },[refresh])
    return (
        <div>
            <CreateMessageThread user={user} refresh={refresh} setRefresh={setRefresh}/>
            <MessageThreads user={user} refresh={refresh} setRefresh={setRefresh} setThreadId={setThreadId}/>
            <MessageBox user={user} threadId={threadId} refresh={refresh} setRefresh={setRefresh}/>
        </div>
    )
}