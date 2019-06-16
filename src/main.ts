import {Controller} from "../spa-lib/controller";
import {HomeComponent} from "./app/components/home/home.component";
import {AppComponent} from "./app/app.component";
import {runApp} from "../spa-lib/core";
import {ApiService} from "./app/services/api-service";

const components: typeof Controller[] = [
  AppComponent,
  HomeComponent
];

const services: any[] = [
  ApiService
];

runApp(components);