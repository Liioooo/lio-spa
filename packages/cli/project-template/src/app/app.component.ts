import {Component, Controller} from '@lio-spa/core';
import {html, TemplateResult} from 'lit-html';

@Component({
    selector: 'app-root',
    styles: require('./app.component.scss'),
    isApplicationRoot: true
})
export class AppComponent extends Controller {

    render(): TemplateResult {
        return html`<router-outlet></router-outlet>`;
    }
}