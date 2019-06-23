import {runApp} from '@lio-spa/core';
import {AppComponent} from './app/app.component';
import {ToDoListComponent} from './app/components/to-do-list/to-do-list.component';
import {TodoService} from './app/services/todo-service';
import {ToDoListItemComponent} from './app/components/to-do-list-item/to-do-list-item.component';
import {EditTodoComponent} from './app/components/edit-todo/edit-todo.component';

runApp({
    components: [
        AppComponent,
        ToDoListComponent,
        ToDoListItemComponent
    ],
    services: [
        TodoService
    ],
    routes: [
        {path: '/', redirectTo: '/todo-list'},
        {path: '/todo-list', component: ToDoListComponent},
        {path: '/edit-todo', component: EditTodoComponent},
    ],
    enableRouting: true,
    globalStyles: require('./global-styles.scss')
});