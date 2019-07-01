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

#### two-way data Binding
```html
<input type="text" [(lio-model)]=${bind(this, 'value')}>
<p>${this.value}</p>
```
The value of the text-field will automatically be updated, when `value` changes and the text-field will be updated, when the value varibale changes.
