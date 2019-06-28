import {Component, Controller} from '@lio-spa/core';
import {lio_html} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-root',
    styles: require('./app.component.scss'),
    isApplicationRoot: true
})
export class AppComponent extends Controller {

    render(): TemplateResult {
        return lio_html`
            <a href="/#/home">Home</a>
            <a href="/#/second">Second</a>
            <router-outlet></router-outlet>`;
    }
}