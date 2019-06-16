import {Controller} from "../controller";

export function Input() {
    return function (target: Controller, propertyName: string) {

        if (!target.constructor['__inputs']) {
            target.constructor['__inputs'] = [];
            Object.defineProperty(target.constructor, 'observedAttributes', {
                get: () => target.constructor['__inputs']
            })
        }

        (target.constructor['__inputs'] as string[]).push(propertyName);

    }
}