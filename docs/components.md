## How to write Components code and Templates

Components are located in `src/app/components/{comp_name}/{comp_name}.ts` <br>
In this file you define a Controller-Class that implements a `render()` method, that returns the HTML-Template. 

An example component file:

```ts
import {Component, Controller, lio_html, bind} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller {

    public value: string = 'default value';

    randomizeValue() {
      this.value = Math.random().toString();
    }

    render(): TemplateResult {
        return lio_html`
            <div>
                <input type="text" [(lio-model)]=${bind(this, 'value')}>
                <p>${this.value}</p>
                <button (click)=${this.randomizeValue}>Randomize value</button>
            </div>
        `;
    }
}
```

This component will show a input and a text, the text will reflect the value of the input-field.<br>
By clicking the 'Randomize Value Button', the shown value will be randomized.<br>
All the changes will be reflected in the DOM automatically.

### [Next Step: How to write Templates in detail](templating.md)
