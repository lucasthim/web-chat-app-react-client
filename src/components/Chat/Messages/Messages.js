import React,{Component} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


class Messages extends Component {

    listChat(messages) {
        return messages.flatMap((message, index) => [
            <React.Fragment key={message.id}>
            {message.isUserMessage? 
            (<div>{this.showUserMessage(message)}</div>) : 
            <div>{this.showSystemMessage(message)}</div>}
            </React.Fragment>
            ,
            <Divider key={'divider-'+ message.id}/>
        ]).slice(0,-1)
    }

    showUserMessage(message) {
        return (
            <ListItem disableGutters>
                <ListItemAvatar>
                    <Avatar alt={message?.user} src="/"/>
                </ListItemAvatar>
                <ListItemText
                primary={
                    <React.Fragment>
                    <Typography 
                        component="div" 
                        variant="body2" 
                        color="textSecondary">
                        {message?.user + ' [at ' + this.formatDateAndTime(message?.datetime) + ']:'}
                        </Typography> 
                    </React.Fragment>
                }
                // {message?.user}
                secondary={
                <React.Fragment>
                    {this.formatDateAndTime(message?.datetime) + ' - '}
                    <Typography component="span" variant="body1" color="textPrimary">
                        {message?.body}
                    </Typography> 
                </React.Fragment>
                }/>
            </ListItem>
        );
    }

    showSystemMessage(message) {
        return (
            <ListItem>
                <ListItemText 
                primary={
                    <React.Fragment>
                        <Typography 
                        style={{ textAlign:'center',padding:'0.5vh 0 0.5vh 0'}}
                        component="div" 
                        variant="body2" 
                        color="textSecondary">
                        {message?.body}
                        </Typography> 
                    </React.Fragment>
                }/>
            </ListItem>

        );
    }
    
    formatDateAndTime(datetime) {
        if(datetime !== null || datetime !== undefined){
            return new Date(datetime).toLocaleTimeString()
        }
        return ''
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render () {
        return (
            <div>
                <Container style={{ height: '65vh',margin:'1vh 0 1vh 0',overflowY:'scroll'}}>
                    <List component="nav">
                        {this.listChat(this.props.messages)}
                    </List>
                    <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </Container>
            </div>
        );
    }
};

export default Messages;