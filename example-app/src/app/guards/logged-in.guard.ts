import {CanActivate, CanActivateResult, InjectService} from '@lio-spa/core';
import {AuthService} from '../services/auth.service';

export class LoggedInGuard implements CanActivate {

    @InjectService(AuthService)
    authService: AuthService;

    canActivate(path: string, routeParams: unknown): CanActivateResult {
        return {
            canActivate: this.authService.isLoogedIn,
            redirectToPath: '/login'
        };
    }

}