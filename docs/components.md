## How to write Components

Components are located in `{app_name}src/app/components/{comp_name}/{comp_name}.ts` <br>
In this file you define a Controller-Class that implements a `render()` method, that returns the HTML-Template. 

An example component file:
```ts
import {Component, Controller, lio_html, bind, Input, OnInit} from '@lio-spa/core';
import {TemplateResult} from 'lit-html';

@Component({
    selector: 'app-home',
    styles: require('./home.component.scss')
})
export class HomeComponent extends Controller implements OnInit {

    public value: string = 'default value';

    @Input()
    public exampleInput: string;

    onInit() {
      console.log(this.exampleInput);
    }

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

This component will show an input-field and a paragraph, the paragraph will reflect the value of the input-field.<br>
By clicking the 'Randomize Value Button', the shown value will be randomized.<br>
All the changes will be reflected in the DOM automatically, thanks to automatic change-detection.
The value of `exampleInput` will also be logged when the component is added to the DOM.

This component can be used by placing `<app-home exampleInput="inputValue"></app-home>` in html-code.<br>
Where `exampleInput` in the Controller gets the value 'inputValue'. 

### Inputs and Outputs

Every component can have as many Inputs and Outputs as you want.

Inputs can be defined with use of the `@Input` decorator, as shown above.

Outputs are defined with use of the `@Output` decorator:
```ts
@Output()
public someOutput: OutputEmitter = new OutputEmitter<string>();
```

Then you can emit values by calling `this.someOutput.emit('value');`

Parent Components can listen to outputs by listening to the `someOutput` event. This can be done with [event-Bindings](templating.md#event-binding).

### Global Listeners
Every component can listen to events on window or document, by using the `@GlobalListener` decorator.

```ts
@GlobalListner('window:mousemove')
onMouseMove(e: Mouseevent) {
  console.log(e);
}
```

### Change-Detection 

Change-Detection is being run automatically, when inputs of componets change or when certain events are fired, this is explained further in the next section.

It is also possible to invoke change-detection manually by calling `this.updateOwnDOM()` for the current component.
Or `this.updateChildrenDOM()` for the current component and all it´s child components.

To run change-detection for the entire application you have to inject the `ApplicationService` Service and call `updateApplicationDom()` on it.
[What is a service?](services.md)

### Lifecycle of Components

There a few Lifecycle-Hooks:

- OnInit<br>
  called when the component is added to the DOM.
  
- OnDestroy<br>
  called when the component is removed to the DOM.
 
- OnDestroy<br>
  called when one of the components inputs changes.

### [Next Step: How to write Templates in detail](templating.md)
