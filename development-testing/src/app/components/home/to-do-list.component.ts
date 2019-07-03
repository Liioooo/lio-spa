import {Component, Controller, lio_html, bind, GlobalListener, OnInit} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-todo-list',
    styles: require('./to-do-list.component.scss')
})
export class ToDoListComponent extends Controller {

    render(): TemplateResult {
        return lio_html`
            <div>
              
            </div>
        `;
    }
}