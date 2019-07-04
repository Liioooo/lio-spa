import {Component, Controller, lio_html, InjectService, Input, bind} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo.service';
import {Todo} from '../../models/todo';

@Component({
    selector: 'app-todo-list',
    styles: require('./todo-list.component.scss')
})
export class TodoListComponent extends Controller {

    @InjectService(TodoService)
    toDoService: TodoService;

    @Input()
    todos: Todo[];

    render(): TemplateResult {
        return lio_html`
            <div class="container">
              ${this.todos.map((todo) => {
                  return lio_html`<div class="todo-entry">
                                    <input type="checkbox" [(lio-model)]=${bind(todo, 'done')}>
                                    <p>${todo.title}</p>
                                  </div>`;
               })}
            </div>
        `;
    }
}