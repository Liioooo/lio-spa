import {Component} from "../../../../spa-lib/decorators/component-decorator";
import {Controller} from "../../../../spa-lib/controller";
import {html, TemplateResult} from "lit-html";
import {InjectService} from "../../../../spa-lib/decorators/inject-service-decorator";
import {ApiService} from "../../services/api-service";

@Component({
    selector: 'app-site2',
    styles: require('./site2.component.scss')
})
export class Site2Component extends Controller {

    @InjectService(ApiService)
    apiService: ApiService;


    render(): TemplateResult {
        return html`
            <div>
                <p>Site 2</p>
                <p>${this.apiService.getData()}</p>
            </div>
        `;
    }

}