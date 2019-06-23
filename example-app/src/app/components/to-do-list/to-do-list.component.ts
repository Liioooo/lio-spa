import {Component, Controller, InjectService} from '@lio-spa/core';
import {html, TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo-service';

@Component({
    selector: 'app-to-do-list',
    styles: require('./to-do-list.component.scss')
})
export class ToDoListComponent extends Controller {

    @InjectService(TodoService)
    private toDoService: TodoService;

    render(): TemplateResult {
        return html`
            <div>
                <h1>ToDo - List</h1>
                ${this.toDoService.todos.map((todo) => html`<app-to-do-list-item todoid=${todo.id}></app-to-do-list-item>`)}
            </div>
        `;
    }
}