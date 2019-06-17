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
}