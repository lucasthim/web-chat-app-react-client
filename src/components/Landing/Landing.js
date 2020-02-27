import  React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import authenticationService from '../../resources/AuthenticationService';
import LoginService  from "../../resources/LoginService";
import NickName from './Nickname/Nickname';

class Landing extends Component {
    
    constructor() {
        super();
        this.state = {
            currentNickname: '',
            showDialog: false,
            nicknameAlreadyChosen: false,
            isAuthenticated: false
        };
        this.loginService = new LoginService();
    }

    componentDidMount() {
        this.checkUserLoggedIn();
    }

    checkUserLoggedIn() {
       if (authenticationService.isUserCached()){
            authenticationService.loadUserIfCached(() => {
                this.props.history.push('/chat');
            });
       }
    }

    saveNickname = (nickname) => {
        this.loginService.userLogin(nickname,(result) => {
            this.setState({
                isLoaded: true,
                currentNickname: nickname,
                nicknameAlreadyChosen: !result.data.nicknameSaved,
                showDialog: !result.data.nicknameSaved
            });

            if(result.data.nicknameSaved){
                authenticationService.login(nickname,() => {
                    this.props.history.push('/chat');
                });
            }
        },
        (error) => {
            this.setState({
            isLoaded: true,
            nicknameAlreadyChosen: true,
            error
            });
        });
    }

    openDialog = () => {
        this.setState({showDialog:true})
    }

    closeDialog = (showDialog) => {
        this.setState({showDialog:showDialog})
    }

    render() {
        return (
            <div>
                <NickName 
                emitNickname = {this.saveNickname}
                emitCloseDialog = {this.closeDialog}
                showDialog = {this.state.showDialog}
                nicknameAlreadyChosen = {this.state.nicknameAlreadyChosen}/>
                <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                    <Grid item xs={6}>
                        {/* <Typography component="div" style={{ height: '70vh',margin:'2vh 0 1vh 0' }}> */}
                        <Typography variant="h5" align="center" color="primary" gutterBottom>
                            Ready to meet some really cool people and have a great time?
                        </Typography>

                        <Button color="primary" fullWidth={true} onClick={this.openDialog} size="large" variant="contained">
                            Click here!
                        </Button>
                    </Grid>   

                </Grid> 
            </div>

        );
    }
}

export default Landing;