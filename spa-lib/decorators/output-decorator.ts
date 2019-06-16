import {Controller} from "../controller";
import {OutputEmitter} from "../output-emitter";

export function Output() {
    return function (target: Controller, propertyName: string) {

        Object.defineProperty(target, propertyName, {
           set(userDefinedValue: OutputEmitter) {
               Object.defineProperty(this, propertyName, {
                   get() {
                       return userDefinedValue;
                   },
                   set(value: {__eventName: string, __hostElement: Controller}) {
                       value.__eventName = propertyName;
                       value.__hostElement = this;
                       userDefinedValue = value as any;
                   }
               });
               this[propertyName] = userDefinedValue;
           }
        });
    }
}