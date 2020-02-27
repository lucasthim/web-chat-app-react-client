
import socketIOClient from 'socket.io-client';

class Socket {

    constructor() {
        this.server_url = process.env.SERVER_URL || 'http://localhost:8001/';
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