import React, { Component} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

class NickName extends Component {
  
    constructor() {
        super();
        this.state = {
            currentNickname: '',
            nickNameEmpty: false,
            saveNicknameError:false,
            nicknameAlreadyChosen: false
        };

    }

    checkNicknameEmpty() {
        return this.state.currentNickname === null || this.state.currentNickname.trim() === '';
    }

    showWarningPickNickname() {
        return (this.state.nickNameEmpty ? 
            <Typography variant="caption" align="center" color="error" gutterBottom>
              Hey, make sure to actually pick a nickname.
            </Typography> : null);
    }

    showWarningNicknameChosen() {
        return (this.props.nicknameAlreadyChosen ? 
            <Typography variant="caption" align="center" color="error" gutterBottom>
              This nickname has been already picked! Please, choose another one.
            </Typography> : null);
    }

    showWarningServer() {
      return (this.props.saveNicknameError ?
          <Typography variant="caption" align="center" color="error" gutterBottom>
              Cannot enter chat room right now. Try again later.
          </Typography> : null);
    }
    
    registerNickname = () => {
      if(this.checkNicknameEmpty()){
        this.setState({nickNameEmpty:true});
      } else {
        this.setState({nickNameEmpty:false});
        this.props.emitNickname(this.state.currentNickname);
      }
    };
    
    closeDialog = () => {
      this.props.emitCloseDialog(false);
    }
    clearNickname = () => {
      this.setState({currentNickname: ''});
    }

    render() {
      return (
        <div>
          <Dialog 
          open={this.props.showDialog}
          onClose = {this.clearNickname}
          onEscapeKeyDown = {this.closeDialog}
          onBackdropClick = {this.closeDialog}
          aria-labelledby="form-dialog-title">
            <DialogContent>
              <DialogContentText>
              Hi there! Pick a really cool nickname and start chatting right away!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Cool nickname"
                value = {this.state.currentNickname}
                onChange = { (event) =>{ this.setState({currentNickname:event.target.value})}}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.registerNickname} color="primary" disabled = {this.checkNicknameEmpty()}>
                Hook Me Up!
              </Button>
            </DialogActions>
            {this.showWarningPickNickname()}
            {this.showWarningNicknameChosen()}
            {this.showWarningServer()}

          </Dialog>
        </div>
      )
    };
}
export default NickName