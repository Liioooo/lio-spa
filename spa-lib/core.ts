import {AppConfig, Service} from './interfaces';
import {Router} from './router/router';
import {StylesService} from './styles-service';

export function runApp(config: AppConfig) {
    const stylesService: StylesService = (StylesService as any as Service).getInstance();
    stylesService.globalStyles = config.globalStyles;

    if (config.enableRouting === undefined || config.enableRouting) {
        const router: Router = (Router as any as Service).getInstance();

        // setTimeout is there to work also with polyfills:
        // https://github.com/webcomponents/polyfills/tree/master/packages/shadydom
        setTimeout(() => router._initRouting(config.routes), 0);
    }
}