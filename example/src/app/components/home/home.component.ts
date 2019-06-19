import {Component} from '../../../../../packages/lio-spa/src/decorators/component-decorator';
import {Controller} from '../../../../../packages/lio-spa/src/controller';
import {html, TemplateResult} from 'lit-html';
import {InjectService} from '../../../../../packages/lio-spa/src/decorators/inject-service-decorator';
import {ApiService} from '../../services/api-service';
import {OnInit} from '../../../../../packages/lio-spa/src/lifecycle/on-init';
import {Router} from '../../../../../packages/lio-spa/src/router';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller implements OnInit {

    @InjectService(ApiService)
    apiService: ApiService;

    @InjectService(Router)
    router: Router;

    onInit(): void {
    }

    nav() {
        this.router.navigate('/site2', 'kek');
    }

    render(): TemplateResult {
        return html`
            <div>
                <p>Home</p>
                <p>${this.apiService.getData()}</p>
                <button @click="${this.nav}">to Site2</button>
            </div>
        `;
    }

}