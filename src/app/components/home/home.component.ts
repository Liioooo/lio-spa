import {Component} from "../../../../spa-lib/decorators/component-decorator";
import {Controller} from "../../../../spa-lib/controller";
import {html, TemplateResult} from "lit-html";
import {Output} from "../../../../spa-lib/decorators/output-decorator";
import {OutputEmitter} from "../../../../spa-lib/output-emitter";
import {InjectService} from "../../../../spa-lib/decorators/inject-service-decorator";
import {ApiService} from "../../services/api-service";
import {OnInit} from "../../../../spa-lib/lifecycle/on-init";

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller implements OnInit{

    @Output()
    testOutput = new OutputEmitter<any>();

    @InjectService(ApiService)
    apiService: ApiService;

    onInit(): void {
        //console.log(this.apiService.getData());
    }

    fire() {
        //this.testOutput.emit('test');
    }

    render(): TemplateResult {
        return html`
            <div>
                <p>${this.apiService.getData()}</p>
                <button @click="${this.fire}">Fire</button>
            </div>
        `;
    }

}