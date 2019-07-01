## main.ts File

This is the main entry file for your project.
Here you define all your Components, Services, Routes and Global Styles.

An example `main.ts` file:

```ts
import {runApp} from '@lio-spa/core';
import {AppComponent} from './app/app.component';
import {HomeComponent} from './app/components/home/home.component';
import {SecondComponent} from './app/components/second/second.component';

runApp({
    components: [
        AppComponent,
        HomeComponent,
        SecondComponent
    ],
    services: [],
    routes: [
        {path: '/', redirectTo: '/home'},
        {path: '/home', component: HomeComponent},
        {path: '/second', component: SecondComponent},
    ],
    enableRouting: true,
    globalStyles: require('./global-styles.scss')
});
```

### [Next Step: How to write Components](components.md)
