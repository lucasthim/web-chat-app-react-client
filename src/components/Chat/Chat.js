import  React,{Component} from 'react';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MessageBox  from "./MessageBox/MessageBox";
import Messages from './Messages/Messages';
import Message from './Messages/Message';

import authenticationService from '../../resources/AuthenticationService';
import LoginService  from "../../resources/LoginService";
import Socket  from "../../resources/Socket";

class Chat extends Component {
    constructor() {
        super();
        this.loginService = new LoginService();
        this.socket = new Socket();
        this.state = {
            sessionNickname: authenticationService.authUser,
            messages: []
        }
        //TODO: Add method to handle reload F5 and first loading. 
        // if (window.performance) {
        //     if (performance.navigation.type === 1) {
        //         console.log( "This page is reloaded" );
        //     } else  {
        //         console.log( "This page is not reloaded" );
        //     }
        // }
    }

    componentDidMount() {
        this.socket.emitEvent('loadMessages');

        this.socket.listenOn('loadMessages',this.loadMessages);
        this.socket.listenOn('newMessage',this.loadNewMessage);

        this.socket.emitEvent('userConnected', new Message(
            `${this.state.sessionNickname} has joined the room.`,
            this.state.sessionNickname,
            false,
            true));
    }

    loadMessages = (messages) => {
        console.log(messages)
        this.setState({messages:messages});
    }

    loadNewMessage = (message) => {
        var messages = this.state.messages
        messages.push(message);
        this.setState({messages:messages});
    }

    sendMessage = (message) => {
        this.socket.emitEvent('sendMessage',
        new Message(message,this.state.sessionNickname,true));
    }

    logout = () => {

        // const logoutMessage = new Message(
        //     `${this.state.sessionNickname} has left the room.`,
        //     this.state.sessionNickname,
        //     false,
        //     true);
        // this.socket.emitEvent('sendMessage',logoutMessage);
        this.loginService.userLogout(this.state.sessionNickname,
            (response) => {
                authenticationService.logout(
                    () => this.props.history.push('/'))
            },(error) => { 
                console.log("Error trying to leave the chat room.",error)
            }
        );
    }

    componentWillUnmount() {
        const logoutMessage = new Message(
            `${this.state.sessionNickname} has left the room.`,
            this.state.sessionNickname,
            false,
            true);
        this.socket.emitEvent('sendMessage',logoutMessage);
        this.socket.removeListener('loadMessages');
        this.socket.removeListener('newMessage');
    }

    
    render() {
        return (
            <div>
            <Container maxWidth="sm" >
                <Typography variant="h4" align="center" color="textSecondary" gutterBottom>Super Cool Chat App</Typography>
                <Messages messages = {this.state.messages}/>
                <MessageBox emitLogout = {this.logout}
                            emitSendMessage = {this.sendMessage}/>

            </Container>
            </div>
        );
    }

};

export default Chat;
