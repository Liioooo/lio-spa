import {Component, Controller} from '@lio-spa/core/lib';
import {html, TemplateResult} from 'lit-html';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller {

    render(): TemplateResult {
        return html`
            <div>
                <h1>Lio-SPA Framework</h1>
                <p>You can find the full source-code and the documentation on</p>
                <p><a href="https://github.com/Liiioooo/lio-spa">Github</a></p>
            </div>
        `;
    }
}