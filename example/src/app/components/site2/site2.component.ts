import {Component} from '../../../../../packages/lio-spa/src/decorators/component-decorator';
import {Controller} from '../../../../../packages/lio-spa/src/controller';
import {html, TemplateResult} from 'lit-html';
import {InjectService} from '../../../../../packages/lio-spa/src/decorators/inject-service-decorator';
import {ApiService} from '../../services/api-service';
import {Router} from '../../../../../packages/lio-spa/src/router';
import {OnInit} from '../../../../../packages/lio-spa/src/lifecycle/on-init';

@Component({
    selector: 'app-site2',
    styles: require('./site2.component.scss')
})
export class Site2Component extends Controller implements OnInit {

    @InjectService(ApiService)
    apiService: ApiService;

    @InjectService(Router)
    router: Router;

    onInit(): void {
        console.log(this.router.currentRouteParam);
    }

    nav() {
        this.router.navigateByUrl('/site2');
    }

    render(): TemplateResult {
        return html`
            <div>
                <p>Site 2</p>
                <p>${this.apiService.getData()}</p>
                <button @click="${this.nav}">to Site2</button>
            </div>
        `;
    }

}