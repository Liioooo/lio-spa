import {CanActivate, CanActivateResult} from '../../packages/lio-spa/src/interfaces';

export class Site2Guard implements CanActivate {

    canActivate(): CanActivateResult {
        return {
            canActivate: true,
            redirectToPath: '/home'
        };
    }

}