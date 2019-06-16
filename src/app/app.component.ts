import {Component} from "../../spa-lib/decorators/component-decorator";
import {Controller} from "../../spa-lib/controller";
import {html, TemplateResult} from "lit-html";
import {Input} from "../../spa-lib/decorators/input-decorator";
import {OnChanges} from "../../spa-lib/lifecycle/on-changes";
import {OnInit} from "../../spa-lib/lifecycle/on-init";
import {InjectService} from "../../spa-lib/decorators/inject-service-decorator";
import {ApiService} from "./services/api-service";

@Component({
    selector: 'app-root',
    styles: require('./app.component.scss')
})
export class AppComponent extends Controller implements OnInit, OnChanges {

    @Input()
    private input: string;

    @InjectService(ApiService)
    apiService: ApiService;

    onInit(): void {
        console.log('init');
    }

    onChanges(property: string, oldValue: string, newValue: string): void {
        console.log(property, oldValue, newValue);
    }

    handleClick(e: MouseEvent) {
        this.apiService.setData('other data');
        this.updateDOM();
        //console.log(e);
    }

    handleOutput(e) {
        console.log(e);
    }

    render(): TemplateResult {
        return html`
            <div>
                <p>${this.input}</p>
                <button @click="${this.handleClick}">click</button>
                <app-home @testOutput="${this.handleOutput}"></app-home>
            </div>
        `;
    }
}