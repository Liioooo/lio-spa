import {runApp} from '@lio-spa/core';
import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home/home.component';

runApp({
    components: [
        AppComponent,
        HomeComponent
    ],
    services: [],
    routes: [
        {path: '/', redirectTo: '/home'},
        {path: '/home', component: HomeComponent},
    ],
    enableRouting: true,
    globalStyles: require('./global-styles.scss')
});