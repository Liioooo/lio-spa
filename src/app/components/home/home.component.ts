import {Component} from "../../../../spa-lib/decorators/component-decorator";
import {Controller} from "../../../../spa-lib/controller";
import {html, TemplateResult} from "lit-html";
import {InjectService} from "../../../../spa-lib/decorators/inject-service-decorator";
import {ApiService} from "../../services/api-service";
import {OnInit} from "../../../../spa-lib/lifecycle/on-init";
import {Router} from "../../../../spa-lib/router";

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller implements OnInit{

    @InjectService(ApiService)
    apiService: ApiService;

    @InjectService(Router)
    router: Router;

    onInit(): void {
    }

    render(): TemplateResult {
        return html`
            <div>
                <p>Home</p>
                <p>${this.apiService.getData()}</p>
            </div>
        `;
    }

}