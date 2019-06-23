import {Component, Controller, Input} from '@lio-spa/core';
import {html, TemplateResult} from 'lit-html';
import {InjectService} from '@lio-spa/core/lib';
import {TodoService} from '../../services/todo-service';

@Component({
    selector: 'app-to-do-list-item',
    styles: require('./to-do-list-item.component.scss')
})
export class ToDoListItemComponent extends Controller {

    @Input()
    todoid: string;

    @InjectService(TodoService)
    todoService: TodoService;

    render(): TemplateResult {
        return html`
            <div>
                <p>${this.todoService.getTodoFromId(parseInt(this.todoid)).name}</p>
                <a href=${`/#/edit-todo/${this.todoid}`}>Edit</a>
            </div>
        `;
    }
}