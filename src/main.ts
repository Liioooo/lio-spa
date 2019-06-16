import {Controller} from "../spa-lib/controller";
import {HomeComponent} from "./app/components/home/home.component";
import {AppComponent} from "./app/app.component";
import {runApp} from "../spa-lib/core";

const components: typeof Controller[] = [
  AppComponent,
  HomeComponent
];

runApp(components);