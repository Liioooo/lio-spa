import {AppConfig} from "./interfaces";
import {Router} from "./router/router";

export function runApp(config: AppConfig) {
    const router: Router = (Router as any as {getInstance: any}).getInstance();

    // setTimeout is there to work also with polyfills:
    // https://github.com/webcomponents/polyfills/tree/master/packages/shadydom
    setTimeout(() => router._initRouting(config.routes), 0);
}