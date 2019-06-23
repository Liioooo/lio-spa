import {Component, Controller, InjectService} from '@lio-spa/core';
import {html, TemplateResult} from 'lit-html';
import {TodoService} from '../../services/todo-service';
import {OnInit, Router} from '@lio-spa/core/lib';
import {Todo} from '../../models/todo';

@Component({
    selector: 'app-edit-todo',
    styles: require('./edit-todo.component.scss')
})
export class EditTodoComponent extends Controller implements OnInit {

    @InjectService(TodoService)
    private toDoService: TodoService;

    @InjectService(Router)
    router: Router;

    private toDo: Todo;

    onInit(): void {
        this.toDo = this.toDoService.getTodoFromId(parseInt(this.router.currentRouteParam as string));
    }

    nameChange(e) {
        console.log(e);
        console.log(this.toDo.name);
    }

    render(): TemplateResult {
        return html`
            <div>
                <h1>Editing ToDo</h1>
                <label>Name:</label>
                <input type="text" .value=${this.toDo.name} @keyup=${this.nameChange} id="name">
            </div>
        `;
    }
}