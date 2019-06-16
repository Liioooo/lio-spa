import {AppConfig} from "./interfaces";
import {Router} from "./router";

export function runApp(config: AppConfig) {
    const router: Router = (Router as any as {getInstance: any}).getInstance();
    router._initRouting(config.routes);
}