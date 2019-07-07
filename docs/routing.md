## How to configure the Router

```ts
const routes: Route[] [
  {path: '/', redirectTo: '/home'},
  {path: '/home', component: HomeComponent},
  {
    path: '/second', 
    lazyLoadRoute: () => import('lazy-page').then(page => page.routeRootComp),
    canActivate: AuthGuard
  },
],
```

It is possible to include a component directly like 'HomeComponent', but it is also possible to lazy load routes, to ship less code, when the page loads.

Lazy loading is done by creating a different entry-file for each lazy-loaded route. This file is then dynamically imported into the main entry-file.

##### Lazy Loading Example File:
lazy-page.ts
```ts
import {Site2Component} from './app/components/site2/site2.component';
export {CompOnlyUsedBySite2} from './app/components/comp-only-used-by-site2/comp-only-used-by-site2.component'

export const routeRootComp = Site2Component;
```

### Guards:

You can prevent users from activating certain routes with the use of route-guards. Guards are evaluated just before the route gets activated.

##### Route-Guard Example File:
```ts
import {CanActivate, CanActivateResult} from '@lio-spa/core';

export class AuthGuard implements CanActivate {

    canActivate(): CanActivateResult {
        return {
            canActivate: false,
            redirectToPath: '/home'
        };
    }

} 
```

When the guard returns `false` the user gets redirected to the provided path.

### Route Params

You can pass parameters to routes. This Params can be read from the `Router` [Service](services.md).

The currentRouteParam can be read by calling `currentRouteParam` on the service.

### [Next Step: Services](services.md)
