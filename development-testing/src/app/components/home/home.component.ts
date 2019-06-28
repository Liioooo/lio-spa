import {Component, Controller, lio_html} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';
import {bind} from '@lio-spa/core/lib/templating';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller {

    public value: string = 'kek';

    private show = true;
    public pref: any;
    public redClass = true;

    handleClick(e) {
        //console.log(this.value, 'comp');
        //console.log(this.pref);
    }

    random() {
        this.value = Math.random() + '';
    }

    toogle() {
        this.show = !this.show;
        this.redClass = !this.redClass;
    }

    render(): TemplateResult {
        return lio_html`
            <div>
                <h1>Lio-SPA Framework</h1>
                <p [class.red]=${this.redClass} #ref=${bind(this, 'pref')} class="kek">You can find the full source-code and the documentation on</p>
                <p><a href="https://github.com/Liiioooo/lio-spa">Github</a></p>
                ${this.show ? lio_html`<input [(lio-model)]=${bind(this, 'value')}>` : ''}
                <button (click)=${this.handleClick}>test kek</button>
                <button (click:noChangeDet)=${this.random}>random</button>
                <button (click)=${this.toogle}>toggle</button>
            </div>
        `;
    }
}