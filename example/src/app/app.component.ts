import {Component} from '../../../packages/lio-spa/src/decorators/component-decorator';
import {Controller} from '../../../packages/lio-spa/src/controller';
import {html, TemplateResult} from 'lit-html';
import {Input} from '../../../packages/lio-spa/src/decorators/input-decorator';
import {InjectService} from '../../../packages/lio-spa/src/decorators/inject-service-decorator';
import {ApplicationService} from '../../../packages/lio-spa/src/application-service';
import {ApiService} from './services/api-service';

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