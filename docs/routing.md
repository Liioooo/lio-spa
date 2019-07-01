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

### Guard Example:

```ts
import {CanActivate, CanActivateResult} from '@lio-spa/core';

export class AuthGuard implements CanActivate{

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

You can pass parameters to routes. This Params can be read from the `Router` [Serivce](services.md).

The currentRouteParam can be read by calling `currentRouteParam()` on the service.
