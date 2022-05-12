import {useState, useEffect} from 'react';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from '../../utilities/socket-api';

export default function SocketTest(props){
    const rooms = ['A', 'B', 'C'];
    const [room, setRoom] = useState(rooms[0]);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    useEffect(() => {
      if (room) initiateSocket(room);
      subscribeToChat((err, data) => {
        if(err) return;
        setChat(oldChats =>[data, ...oldChats])
      });
      return () => {
        disconnectSocket();
      }
    }, [room,chat]);
    sendMessage('A', 'hello')
    return (
        <div>
            <h1>Room: {room}</h1>
            { rooms.map((r, i) => <button onClick={() => setRoom(r)} key={i}>{r}</button>)}
            <h1>Live Chat:</h1>
            <input type="text" name="name" value={message}
            onChange={e => setMessage(e.target.value)} />
            <button onClick={()=> {
                setChat([...chat, message])
                sendMessage(room,message)
            }}>Send</button>
            { chat.map((m,i) => <p key={i}>{m}</p>) }
        </div>
    )
}