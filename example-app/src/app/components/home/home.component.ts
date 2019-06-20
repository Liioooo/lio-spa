import {Component} from '../../../../../packages/core/src/decorators/component-decorator';
import {Controller} from '../../../../../packages/core/src/controller';
import {html, TemplateResult} from 'lit-html';
import {InjectService} from '../../../../../packages/core/src/decorators/inject-service-decorator';
import {ApiService} from '../../services/api-service';
import {OnInit} from '../../../../../packages/core/src/lifecycle/on-init';
import {Router} from '../../../../../packages/core/src/router';

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