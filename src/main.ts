import {HomeComponent} from "./app/components/home/home.component";
import {AppComponent} from "./app/app.component";
import {runApp} from "../spa-lib/core";
import {ApiService} from "./app/services/api-service";
import {Site2Component} from "./app/components/site2/site2.component";

runApp({
    components: [
        AppComponent,
        HomeComponent,
        Site2Component
    ],
    services: [
        ApiService,
    ],
    routes: [
        {path: '/', redirectTo: '/home'},
        {path: '/home', component: HomeComponent},
        {path: '/site2', component: Site2Component}
    ]
});