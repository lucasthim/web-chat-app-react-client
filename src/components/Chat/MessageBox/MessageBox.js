import  React,{Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class MessageBox extends Component {

    constructor() {
        super();
        this.state = {
            message: ''
        }
    }

    sendMessage = () => {
        this.props.emitSendMessage(this.state.message)
        this.setState({message:''})
    };

    logout = () => {
        this.props.emitLogout()
    };

    checkMessageEmpty() {
        return this.state.message.trim() === '';
    }

    render() {
        return (
            <div>
                <form  noValidate autoComplete="off">
                    <div>
                    <TextField
                        label="Message"
                        placeholder="Type your message here"
                        multiline
                        variant="outlined"
                        rows="5"
                        fullWidth
                        margin="normal"
                        value = {this.state.message}
                        onChange = { (event) => this.setState({message:event.target.value})}
                        onKeyDown = { (event) => {
                            if (event.key === "Enter" && !this.checkMessageEmpty()){
                                event.preventDefault();
                                this.sendMessage();
                            }
                        }}
                    />
                    </div>
                </form>
                <Grid container 
                    spacing={0}
                    direction="row"
                    alignItems="center"
                    justify="space-between">
                    <Button onClick={this.logout} size="medium" variant="contained">
                        Log out
                    </Button>
                    <Button onClick={this.sendMessage} disabled={this.checkMessageEmpty()} color="primary" size="medium" variant="contained">
                        Send
                    </Button>
                </Grid>
            </div>
        );
    }
};

export default MessageBox;