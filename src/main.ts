import {HomeComponent} from './app/components/home/home.component';
import {AppComponent} from './app/app.component';
import {runApp} from '../spa-lib/core';
import {ApiService} from './app/services/api-service';
import {Site2Guard} from './site2.guard';

runApp({
    components: [
        AppComponent,
        HomeComponent
    ],
    services: [
        ApiService,
    ],
    routes: [
        {path: '/', redirectTo: '/home'},
        {path: '/home', component: HomeComponent},
        {path: '/site2', lazyLoadRoute: () => import('./site2.page').then((page) => page.routeRootComp), canActivate: Site2Guard}
    ],
    enableRouting: true,
    globalStyles: require('./styles.scss')
});