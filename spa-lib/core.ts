import {AppConfig, Service} from './interfaces';
import {Router} from './router/router';

export function runApp(config: AppConfig) {
    if (config.enableRouting === undefined || config.enableRouting) {
        const router: Router = (Router as any as Service).getInstance();

        // setTimeout is there to work also with polyfills:
        // https://github.com/webcomponents/polyfills/tree/master/packages/shadydom
        setTimeout(() => router._initRouting(config.routes), 0);
    }
}