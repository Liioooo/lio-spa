import {Component, Controller, lio_html, InjectService} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo.service';

@Component({
    selector: 'app-done-todos',
    styles: require('./done-todos.component.scss')
})
export class DoneToDosComponent extends Controller {

    @InjectService(TodoService)
    toDoService: TodoService;
    render(): TemplateResult {
        return lio_html`
            <div>
              <app-todo-list [todos]=${this.toDoService.doneToDos}></app-todo-list>
            </div>
        `;
    }
}