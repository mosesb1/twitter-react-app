import Message from "../Message/Message";
import { useState, useEffect } from "react";
import { getMessages } from "../../utilities/messages-api";
import CreateMessage from "../CreateMessage/CreateMessage";

export default function MessageBox({threadId, user, refresh, setRefresh}){
    const [messages, setMessages] = useState([]);

    const findMessages = async () => {
        try {
            const foundMessages = await getMessages(threadId);
            setMessages(foundMessages.map((message, idx) => {
                return (
                    <Message key={idx} user={user} sender={message.sender} receiver={message.receiver} text={message.message} classNames={["message",message.sender === user._id ? "right" : "left"]}/>
                )
            }))       
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if(!threadId) return;
        findMessages();
    },[refresh, threadId])

    const loaded = () => {
        return (
            <div className="message-right">
                {messages}
                <CreateMessage threadId={threadId} user={user} refresh={refresh} setRefresh={setRefresh}/>
            </div>
        )
    }

    return !threadId ? <h1>Click on a thread to see messages</h1> : loaded();
}