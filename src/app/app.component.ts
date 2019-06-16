import {Component} from "../../spa-lib/decorators/component-decorator";
import {Controller} from "../../spa-lib/controller";
import {html, TemplateResult} from "lit-html";
import {Input} from "../../spa-lib/decorators/input-decorator";
import {InjectService} from "../../spa-lib/decorators/inject-service-decorator";
import {ApplicationService} from "../../spa-lib/application-service";
import {ApiService} from "./services/api-service";

@Component({
    selector: 'app-root',
    styles: require('./app.component.scss'),
    isApplicationRoot: true
})
export class AppComponent extends Controller {

    @Input()
    private input: string;

    @InjectService(ApplicationService)
    app: ApplicationService;

    @InjectService(ApiService)
    api: ApiService;

    update() {
        this.api.setData(Math.random() + '');
        this.app.updateApplicationDOM();
    }

    render(): TemplateResult {
        return html`
            <div>
                <a href="/#/home">home</a>
                <a href="/#/site2">Site 2</a>
                <button @click="${this.update}">Update</button>
                <router-outlet></router-outlet>
            </div>
        `;
    }
}