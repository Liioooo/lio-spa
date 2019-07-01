## How to write Templates in detail

All the following examples are code snippets from inside the `render()` function.

#### Interpolation

```html
<p>${this.valueToBind}</p>
```

#### Simple Attribute Binding
```html
<img [src]=${this.imageSrc}></img>
```

#### Event Binding
```html
<button (click)=${this.handleClick}>Click Me!</button>
```
`handleClick` should be a function implemented in the Controller-Class.

When the event is fired, change-detection for the entire application is run, in order to reflect varibale changes in the DOM.
If you want to prevent this, you can do it by adding 'noChangeDet' to the event:

Example:
```html
<button (click:noChangeDet)=${this.handleClick}>Click Me!</button>
```

#### two-way data Binding
```html
<input type="text" [(lio-model)]=${bind(this, 'value')}>
<p>${this.value}</p>
```
The value of the text-field will automatically be updated, when `value` changes and the text-field will be updated, when the value varibale changes.

It is also possible to disable atomatic change-detection for two-way bindings. Instead of `[(lio-model)]` just use `[(lio-model:noChangeDet)]`

You can read more about templating on the [lit-html docs](https://lit-html.polymer-project.org/guide/template-reference).

The teplating-engine of lio-spa is a slightly modified version of lit-html. Only the binding syntax was changed, all other things described on the lit-html docs can be used in lio-spa.

### [Next Step: Routing](routing.md)
