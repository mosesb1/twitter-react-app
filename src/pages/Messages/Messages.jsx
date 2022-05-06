import MessageThreads from "../../components/MessageThreads/MessageThreads";
import MessageBox from "../../components/MessageBox/MessageBox";
import CreateMessageThread from "../../components/CreateMessageThread/CreateMessageThread";
import { useEffect } from "react";

export default function Messages({user, refresh, setRefresh}){

    useEffect(() => {
        
    },[refresh])
    return (
        <div>
            <CreateMessageThread user={user} refresh={refresh} setRefresh={setRefresh}/>
            <MessageThreads />
            <MessageBox/>
        </div>
    )
}