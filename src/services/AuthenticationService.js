class AuthenticationService {
    constructor(){
        this.authUser = null;
        this.authenticated = this.isUserCached();
    }

    login(user,callback){
        localStorage.setItem('sessionNickname',user);
        this.authUser = user;
        this.authenticated = true;
        callback();
    }

    logout(callback){
        localStorage.removeItem('sessionNickname');
        this.authenticated = false;
        this.authUser = null;
        callback();
    }

    isAuthenticated() {
        return this.authenticated;
    }

    isUserCached() {
        this.authUser = localStorage.getItem('sessionNickname');
        return (this.authUser !== undefined && this.authUser !== null);
    }

    loadUserIfCached(callback) {
        this.authUser = localStorage.getItem('sessionNickname');
        this.authenticated = true;
        callback()
    }
}

export default new AuthenticationService();