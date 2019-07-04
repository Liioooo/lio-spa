import {Component, Controller, lio_html} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-new-todo',
    styles: require('./new-todo.component.scss')
})
export class NewTodoComponent extends Controller {

    render(): TemplateResult {
        return lio_html`
            <div>
              
            </div>
        `;
    }
}