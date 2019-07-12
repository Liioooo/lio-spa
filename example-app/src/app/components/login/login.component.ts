import {bind, Component, Controller, InjectService, lio_html} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-login',
    styles: require('./login.component.scss')
})
export class LoginComponent extends Controller {

    @InjectService(AuthService)
    authService: AuthService;

    public username: string = '';
    public password: string = '';

    private showPasswordIncorrectError: boolean = false;

    private handleLoginClick() {
        const authResult = this.authService.login(this.username, this.password);
        if (!authResult) {
            this.showPasswordIncorrectError = true;
        }
    }

    render(): TemplateResult {
        return lio_html`
            <div>
                <form>
                    <label>Username</label>
                    <input type="text" [(lio-model)]=${bind(this, 'username')}>
                    <label>Password</label>
                    <input type="password" [(lio-model)]=${bind(this, 'password')}>
                    <button (click)=${this.handleLoginClick}>Login</button>
                </form>
                <p [hidden]=${!this.showPasswordIncorrectError}>Username or password is incorrect</p>
            </div>
        `;
    }
}