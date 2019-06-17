import {Service} from "../decorators/service-decorator";
import {CanActivateResult, Route} from "../interfaces";
import {InjectService} from "../decorators/inject-service-decorator";
import {ApplicationService} from "../application-service";

@Service()
export class Router {

    private _routerOutlet: Element;
    private _routes: Route[];
    private _activeRouteElementSelector: string;
    private _currentRouteParam: any;
    private _currentUrl: string;

    @InjectService(ApplicationService)
    private appService: ApplicationService;

    get currentRouteParam(): any {
        return this._currentRouteParam;
    }

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

    private matchRoute(path: string, routeParams: any): Route {
        const found = this._routes.find(route => route.path === path);
        if (!found) {
            throw Error(`Route with path: ${path} couldn't be matched`);
        }
        if(found.redirectTo) {
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
            return (route.component as any as {__selector: string}).__selector;
        } else if (route.lazyLoadRoute) {
            const lazyComponent = await route.lazyLoadRoute();
            return (lazyComponent as any as {__selector: string}).__selector;
        } else {
            throw Error(`Route with path: ${route.path} couldn't be matched`);
        }
    }

    public async navigate(path: string, param?: any) {
        const foundRoute = this.matchRoute(path, param);
        const guardResult = this.checkGuard(foundRoute);
        if(guardResult === true) {
            this._activeRouteElementSelector = await this.getSelector(foundRoute);
            this._currentRouteParam = param;
            this._currentUrl = path + (param ? '/' + param : '');
            let newHash = '#/';
            if (path !== '/') {
                newHash += path.substring(1)
            }
            if (param) {
                newHash += '/' + param;
            }
            location.hash = newHash;
            this.renderRoute();
        } else {
            this.navigate((guardResult as CanActivateResult).redirectToPath, (guardResult as CanActivateResult).redirectToParam)
        }
    }

    public navigateByUrl(url: string) {
        if(url === this._currentUrl) {
            return;
        }
        const urlParts = url.split('/');
        this.navigate('/' + urlParts[1], urlParts[2]);
    }

    private renderRoute() {
        if (this._routerOutlet.children.length > 0) {
            this._routerOutlet.removeChild(this._routerOutlet.children[0]);
        }
        const component = document.createElement(this._activeRouteElementSelector);
        this._routerOutlet.appendChild(component);
    }

}