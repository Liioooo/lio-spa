import {Component, Controller, lio_html} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-root',
    styles: require('./app.component.scss'),
    isApplicationRoot: true
})
export class AppComponent extends Controller {

    render(): TemplateResult {
        return lio_html`
            <router-outlet></router-outlet>`;
    }
}