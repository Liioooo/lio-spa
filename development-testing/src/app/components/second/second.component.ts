import {Component, Controller, lio_html} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-second'
})
export class SecondComponent extends Controller {

    render(): TemplateResult {
        return lio_html`
            <div>
                <h2>Second</h2>
            </div>
        `;
    }
}