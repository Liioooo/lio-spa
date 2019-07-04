import {runApp} from '@lio-spa/core';
import {AppComponent} from './app/app.component';
import {TodoListComponent} from './app/components/todo-list/todo-list.component';
import {LoginComponent} from './app/components/login/login.component';
import {LoggedInGuard} from './app/guards/logged-in.guard';
import {AuthService} from './app/services/auth.service';
import {DoneToDosComponent} from './app/components/done-todos/done-todos.component';
import {NotDoneToDosComponent} from './app/components/not-done-todos/not-done-todos.component';

runApp({
    components: [
        AppComponent,
        TodoListComponent,
        DoneToDosComponent
    ],
    services: [
        AuthService
    ],
    routes: [
        {path: '/', redirectTo: '/todos'},
        {
            path: '/login',
            component: LoginComponent,
        },
        {
            path: '/todos',
            component: NotDoneToDosComponent,
            canActivate: LoggedInGuard
        },
        {
            path: '/done-todos',
            canActivate: LoggedInGuard,
            lazyLoadRoute: () => import('./lazy-pages/done-todos').then((page) => page.routeRootComp)
        }
    ],
    enableRouting: true,
    globalStyles: require('./global-styles.scss')
});