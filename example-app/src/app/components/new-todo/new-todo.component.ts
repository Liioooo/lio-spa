import {bind, Component, Controller, InjectService, lio_html, OnInit, Router} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {Todo} from '../../models/todo';
import {TodoService} from '../../services/todo.service';

@Component({
    selector: 'app-new-todo',
    styles: require('./new-todo.component.scss')
})
export class NewTodoComponent extends Controller implements OnInit {

    @InjectService(Router)
    routerService: Router;

    @InjectService(TodoService)
    todoService: TodoService;

    private editingTodo: Todo;

    onInit(): void {
        if (this.routerService.currentRouteParam === 'new') {
            this.editingTodo = this.todoService.generateNewTodo();
        } else {
            this.editingTodo = {...this.todoService.getTodoById(parseInt(this.routerService.currentRouteParam as string))};
        }
        if (!this.editingTodo) {
            this.routerService.navigate('/todo', 'new');
        }
    }

    saveClick() {
        if (this.routerService.currentRouteParam !== 'new') {
            this.todoService.editToDoWithId(this.editingTodo.id, this.editingTodo);
        } else {
            this.todoService.addToDo(this.editingTodo);
        }
        this.routerService.navigate('/todos');
    }

    cancelClick() {
        this.routerService.navigate('/todos');
    }

    deleteClick() {
        this.todoService.removeToDoById(this.editingTodo.id);
        this.routerService.navigate('/todos');
    }

    render(): TemplateResult {
        return lio_html`
            <div>
                <h2>${this.routerService.currentRouteParam === 'new' ? 'New' : 'Editing'} Todo:</h2>
                <form>
                    <label>Title</label>
                    <input type="text" [(lio-model)]=${bind(this.editingTodo, 'title')}>
                    <label>Description</label>
                    <textarea [(lio-model)]=${bind(this.editingTodo, 'description')}></textarea>
                    <div class="button-container">
                        ${this.routerService.currentRouteParam === 'new' ? '' : lio_html`<button (click)=${this.deleteClick}>Delete</button>`}
                        <button (click)=${this.cancelClick}>Cancel</button>
                        <button (click)=${this.saveClick}>Save</button>
                    </div>
                </form>
            </div>
        `;
    }
}