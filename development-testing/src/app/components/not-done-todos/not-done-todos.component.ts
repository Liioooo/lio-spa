import {Component, Controller, lio_html, InjectService, Router} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo.service';

@Component({
    selector: 'app-not-done-todos',
    styles: require('./not-done-todos.component.scss')
})
export class NotDoneToDosComponent extends Controller {

    @InjectService(TodoService)
    toDoService: TodoService;

    @InjectService(Router)
    routerService: Router;

    private navigateToDone() {
        this.routerService.navigate('/done-todos');
    }

    private addNewClicked() {
        this.routerService.navigate('/todo', 'new');
    }

    render(): TemplateResult {
        return lio_html`
            <div class="container">
              <app-todo-list [todos]=${this.toDoService.notDoneToDos}></app-todo-list>
              <div class="buttons">
                <button (click)=${this.navigateToDone}>Show Done ToDos</button>
                <button (click)=${this.addNewClicked}>Add New ToDo</button>
              </div>
            </div>
        `;
    }
}