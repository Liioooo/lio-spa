import {Service} from "./decorators/service-decorator";
import {Route} from "./interfaces";
import {InjectService} from "./decorators/inject-service-decorator";
import {ApplicationService} from "./application-service";

@Service()
export class Router {

    private _routerOutlet: Element;
    private _routes: Route[];
    private _activeRouteElementSelector: string;
    private _currentRouteParam: any;

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

    private async matchRoute(path: string): Promise<string> {
        const found = this._routes.find(route => route.path === path);
        if (!found) {
            throw Error(`Route with path: ${path} couldn't be matched`);
        }
        if(found.redirectTo) {
            return this.matchRoute(found.redirectTo);
        }

        if (found.component) {
            return (found.component as any as {__selector: string}).__selector;
        } else if (found.lazyLoadRoute) {
            const lazyComponent = await found.lazyLoadRoute();
            return (lazyComponent as any as {__selector: string}).__selector;
        } else {
            throw Error(`Route with path: ${path} couldn't be matched`);
        }
    }

    public async navigate(path: string, param: any) {
        this._activeRouteElementSelector = await this.matchRoute(path);
        this._currentRouteParam = param;
        this.renderRoute();
    }

    public navigateByUrl(url: string) {
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