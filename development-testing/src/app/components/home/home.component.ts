import {Component, Controller, lio_html, bind, GlobalListener, OnInit} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller {

    public value;

    random() {
        console.log(this.value);
        //this.value = Math.random().toString();
    }

    render(): TemplateResult {
        return lio_html`
            <div>
                <h1>Lio-SPA Framework</h1>
                <input type="color" [(lio-model)]=${bind(this, 'value')}>
                <input type="text" [(lio-model)]=${bind(this, 'value')}>
                <p>${this.value}</p>
                <button (click)=${this.random}>random</button>
            </div>
        `;
    }
}