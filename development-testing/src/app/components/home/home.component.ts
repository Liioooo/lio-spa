import {Component, Controller, lio_html} from '@lio-spa/core/lib';
import {TemplateResult} from 'lit-html';
import {bind} from '@lio-spa/core/lib/templating';
import {GlobalListener, OnInit} from '@lio-spa/core/lib';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller implements OnInit {

    public value: string = 'kek';

    private show = true;
    public pref: any;
    public redClass = true;

    handleClick(e) {
        console.log(this.value, 'comp');
        //console.log(this.pref);
    }

    onInit(): void {
        console.log(this.value);
        console.log('inir');
    }

    @GlobalListener('window:keydown')
    listen(e) {
        this.random();
        console.log(this.value);
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
                ${this.show ? lio_html`<input [value]=${this.value}>` : ''}
                <button (click)=${this.handleClick}>test kek</button>
                <button (click)=${this.random}>random</button>
                <button (click)=${this.toogle}>toggle</button>
            </div>
        `;
    }
}