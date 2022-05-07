import MessageThreads from "../../components/MessageThreads/MessageThreads";
import MessageBox from "../../components/MessageBox/MessageBox";
import CreateMessageThread from "../../components/CreateMessageThread/CreateMessageThread";
import { useState, useEffect } from "react";

export default function Messages({user, refresh, setRefresh}){
    const [threadId, setThreadId] = useState(null);

    useEffect(() => {

    },[refresh])
    return (
        <div className="message-page">
            <CreateMessageThread user={user} refresh={refresh} setRefresh={setRefresh}/>
            <div className="message-threads">
                <div className="message-names">
                    <MessageThreads user={user} refresh={refresh} setRefresh={setRefresh} setThreadId={setThreadId}/>
                </div>
                <MessageBox user={user} threadId={threadId} refresh={refresh} setRefresh={setRefresh}/>
            </div>
        </div>
    )
}