import {CanActivate, CanActivateResult} from '../spa-lib/interfaces';

export class Site2Guard implements CanActivate {

    canActivate(): CanActivateResult {
        return {
            canActivate: true,
            redirectToPath: '/home'
        };
    }

}