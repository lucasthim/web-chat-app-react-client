
import socketIOClient from 'socket.io-client';

class Socket {

    constructor() {
        this.server_url = `http://192.168.0.12:${8001}/`;
        this.socket = socketIOClient(this.server_url);
    }

    emitEvent(eventName,payload) {
      this.socket.emit(eventName,payload);
    }

    listenOn(eventName,callback) {
      this.socket.on(eventName,(data) => {callback(data)});
    }

    removeListener(eventName,callback = null) {
      this.socket.off(eventName,(data) => {callback(data)});
    }

}

export default Socket;



// import { useEffect, useRef, useState, Component} from 'react';

    // const [messages, setMessages] = useState([]);
    // const [users, setUsers] = useState([]);
    // const socketRef = useRef();

    // useEffect(() => {
    //     socketRef.current = socketIOClient(server_url);

    //     socketRef.current.on('newChatMessage',(message) => {
    //         setMessages((messages) => [...messages,message]);
    //     });

    //     socketRef.current.on('loadChatHistory',(loadedMessages) => {
    //         setMessages((messages) => [...messages,loadedMessages]);
    //         console.log(loadedMessages)
    //     });

    //     socketRef.current.on('loadUsers',(loadedUsers,) => {
    //         setUsers((loadedUsers) => [...users,loadedUsers]);
    //         console.log(loadedUsers)
    //     });
        
    //     return () => {
    //         socketRef.current.disconnect();
    //     };
    // },[]);

    // const sendMessage = (message) => { socketRef.current.emit('newChatMessage',message) };
    // const sendUser = (user) => { socketRef.current.emit('loadUsers',user) };

    // return {messages, sendMessage,users,sendUser};