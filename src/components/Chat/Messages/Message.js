export default class Message {
    constructor(message = '', user = '',isUserMessage = true,isSystemMessage = false){
        this.user = user ==='' ? 'Anonymous' : user;
        this.body = message;
        this.datetime = Date.now();
        this.isUserMessage = isUserMessage;
        this.isSystemMessage = isSystemMessage;
    }

}
