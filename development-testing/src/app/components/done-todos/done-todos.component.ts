import {Component, Controller, lio_html, InjectService, Router} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo.service';

@Component({
    selector: 'app-done-todos',
    styles: require('./done-todos.component.scss')
})
export class DoneToDosComponent extends Controller {

    @InjectService(TodoService)
    toDoService: TodoService;

    @InjectService(Router)
    routerService: Router;

    navigateToNotDone() {
        this.routerService.navigate('/todos');
    }

    render(): TemplateResult {
        return lio_html`
            <div class="container">
              <app-todo-list [todos]=${this.toDoService.doneToDos}></app-todo-list>
              <div class="buttons">
                <button (click)=${this.navigateToNotDone}>Show undone ToDos</button>
              </div>
            </div>
        `;
    }
}