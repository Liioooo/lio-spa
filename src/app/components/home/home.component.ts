import {Component} from "../../../../spa-lib/decorators/component-decorator";
import {Controller} from "../../../../spa-lib/controller";
import {html, TemplateResult} from "lit-html";
import {Output} from "../../../../spa-lib/decorators/output-decorator";
import {OutputEmitter} from "../../../../spa-lib/output-emitter";

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller {

    @Output()
    testOutput = new OutputEmitter<any>();

    fire() {
        this.testOutput.emit('test');
    }

    render(): TemplateResult {
        return html`
            <div>
                <p>HAHAHAHA</p>
                <button @click="${this.fire}">Fire</button>
            </div>
        `;
    }

}