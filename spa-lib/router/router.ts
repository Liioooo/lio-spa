import {Service} from '../decorators/service-decorator';
import {CanActivateResult, Route} from '../interfaces';
import {InjectService} from '../decorators/inject-service-decorator';
import {ApplicationService} from '../application-service';
import {ControllerConstructorIntern} from '../controller-constructor-intern';

@Service()
export class Router {

    private _routerOutlet: Element;
    private _routes: Route[];
    private _currentRouteElementSelector: string;
    private _currentRouteParam: unknown;
    private _currentUrl: string;

    @InjectService(ApplicationService)
    private appService: ApplicationService;

    /**
     * @return parameter for the current route
     */
    get currentRouteParam(): unknown {
        return this._currentRouteParam;
    }

    /**
     * Initialzes the Router, should not be called by the framework user
     * @param routes
     * @param routerOutletTagName
     * @private
     */
    public _initRouting(routes: Route[], routerOutletTagName = 'router-outlet') {
        if (this._routes) {
            throw Error('This method should only be called once');
        }
        this._routes = routes;

        this._routerOutlet = this.appService._appRoot['_renderRoot'].querySelector(routerOutletTagName);

        this.navigateByUrl(location.hash.slice(1).toLowerCase() || '/');
        window.addEventListener('hashchange', () => {
            this.navigateByUrl(location.hash.slice(1).toLowerCase() || '/');
        });
    }

    private matchRoute(path: string, routeParams: unknown): Route {
        const found = this._routes.find((route) => route.path === path);
        if (!found) {
            throw Error(`Route with path: ${path} couldn't be matched`);
        }
        if (found.redirectTo) {
            return this.matchRoute(found.redirectTo, routeParams);
        }
        return found;
    }

    private checkGuard(route: Route): CanActivateResult | boolean {
        if (route.canActivate) {
            const canActivateResult = new route.canActivate().canActivate() as CanActivateResult;
            if (canActivateResult.canActivate) {
                return true;
            }
            return canActivateResult;
    }
        return true;
    }

    private async getSelector(route: Route): Promise<string> {
        if (route.component) {
            return (route.component as unknown as ControllerConstructorIntern).__selector;
        } else if (route.lazyLoadRoute) {
            const lazyComponent = await route.lazyLoadRoute();
            return (lazyComponent as unknown as ControllerConstructorIntern).__selector;
        } else {
            throw Error(`Route with path: ${route.path} couldn't be matched`);
        }
    }

    /**
     * navigates to the given route with the given parameter
     * @param path
     * @param param route-parameter
     * @return Promise just for internal use, can be ignored
     */
    public async navigate(path: string, param?: unknown) {
        const foundRoute = this.matchRoute(path, param);
        const guardResult = this.checkGuard(foundRoute);
        if (guardResult === true) {
            this._currentRouteElementSelector = await this.getSelector(foundRoute);
            this._currentRouteParam = param;
            this._currentUrl = path + (param ? '/' + param : '');
            let newHash = '#/';
            if (path !== '/') {
                newHash += path.substring(1);
            }
            if (param) {
                newHash += '/' + param;
            }
            location.hash = newHash;
            this.renderRoute();
        } else {
            this.navigate((guardResult as CanActivateResult).redirectToPath, (guardResult as CanActivateResult).redirectToParam);
        }
    }

    /**
     * navigates to the given route, url should be formated like in the url, but
     * without the trailing '/#'
     * @param url
     */
    public navigateByUrl(url: string) {
        if (url === this._currentUrl) {
            return;
        }
        const urlParts = url.split('/');
        this.navigate('/' + urlParts[1], urlParts[2]);
    }

    private renderRoute() {
        if (this._routerOutlet.children.length > 0) {
            this._routerOutlet.removeChild(this._routerOutlet.children[0]);
        }
        const component = document.createElement(this._currentRouteElementSelector);
        this._routerOutlet.appendChild(component);
    }

}