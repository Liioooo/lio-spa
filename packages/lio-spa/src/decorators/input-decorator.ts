import {Controller} from '../controller';
import {ControllerConstructorIntern} from '../controller-constructor-intern';

export function Input() {
    return function (target: Controller, propertyName: string) {

        if (!(target.constructor as ControllerConstructorIntern).__inputs) {
            (target.constructor as ControllerConstructorIntern).__inputs = [];
            Object.defineProperty(target.constructor, 'observedAttributes', {
                get: () => (target.constructor as ControllerConstructorIntern).__inputs
            });
        }

        (target.constructor as ControllerConstructorIntern).__inputs.push(propertyName);

    };
}