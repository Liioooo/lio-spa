import {CanActivate, CanActivateResult} from '../../packages/core/src/interfaces';

export class Site2Guard implements CanActivate {

    canActivate(): CanActivateResult {
        return {
            canActivate: true,
            redirectToPath: '/home'
        };
    }

}