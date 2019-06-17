import {Controller} from "./controller";

export interface AppConfig {
    components: typeof Controller[];
    services: any[];
    routes: Route[];
}

export interface Route {
    path: string;
    component?: typeof Controller;
    redirectTo?: string;
    lazyLoadRoute?: () => Promise<typeof Controller>;
    canActivate?: any
}

export interface CanActivate {
    canActivate(path: string, routeParams: any): CanActivateResult;
}

export interface CanActivateResult {
    canActivate: boolean;
    redirectToPath: string;
    redirectToParam?: string;
}