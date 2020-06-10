class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) {
        this.authenticated = true
        cb()
        console.log('login');
        
    }

    logout(cb) {
        this.authenticated = false
        cb()
        console.log('logout');
        
    }

    isAuthenticated() {
        console.log('isAuth');
        return this.authenticated
        
    }
}

export default new Auth()