import {runApp} from '@lio-spa/core';
import {AppComponent} from './app/app.component';
import {ToDoListComponent} from './app/components/home/to-do-list.component';
import {LoginComponent} from './app/components/login/login.component';
import {LoggedInGuard} from './app/guards/logged-in.guard';
import {AuthService} from './app/services/auth.service';

runApp({
    components: [
        AppComponent,
        ToDoListComponent,
    ],
    services: [
        AuthService
    ],
    routes: [
        {path: '/', redirectTo: '/todos'},
        {
            path: '/todos',
            component: ToDoListComponent,
            canActivate: LoggedInGuard
        },
        {
            path: '/login',
            component: LoginComponent
        }
    ],
    enableRouting: true,
    globalStyles: require('./global-styles.scss')
});