import {Component, Controller, lio_html, InjectService} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo.service';

@Component({
    selector: 'app-not-done-todos',
    styles: require('./not-done-todos.component.scss')
})
export class NotDoneToDosComponent extends Controller {

    @InjectService(TodoService)
    toDoService: TodoService;

    render(): TemplateResult {
        return lio_html`
            <div>
              <app-todo-list [todos]=${this.toDoService.notDoneToDos}></app-todo-list>
            </div>
        `;
    }
}