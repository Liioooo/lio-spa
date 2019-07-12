import {InjectService, Router, Service} from '@lio-spa/core';

@Service()
export class AuthService {

    @InjectService(Router)
    private routerService: Router;

    // dummy user data
    private readonly userdata = {
        username: 'user',
        password: '123'
    };

    private _isLoggedIn: boolean = false;

    public login(username: string, password: string): boolean {
        this._isLoggedIn = username === this.userdata.username && password === this.userdata.password;
        if (this._isLoggedIn) {
            sessionStorage.setItem('loggedIn', 'true');
            this.routerService.navigate('/todos');
        }
        return this._isLoggedIn;
    }

    public get isLoogedIn(): boolean {
        if (sessionStorage.getItem('loggedIn') === 'true') {
            this._isLoggedIn = true;
        }
        return this._isLoggedIn;
    }

    public logout() {
        this._isLoggedIn = false;
        sessionStorage.removeItem('loggedIn');
        this.routerService.navigate('/login');
    }
}