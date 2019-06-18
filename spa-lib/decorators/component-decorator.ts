import {ControllerConstructorIntern} from '../controller-constructor-intern';

export function Component(config: {
    selector: string,
    styles?: string,
    isApplicationRoot?: boolean
}) {
    return (target: Function) => {

        const original = target;

        // define static properties
        Object.defineProperties(original, {
            __selector: {
                value: config.selector,
                writable: false
            },
            __styles: {
                value: config.styles || '',
                writable: false
            },
            __isApplicationRoot: {
                value: config.isApplicationRoot || false,
                writable: false
            }
        });

        // push selector to static __allCustomElements property
        if (!Object.getPrototypeOf(original).__allCustomElements) {
            Object.getPrototypeOf(original).__allCustomElements = [];
        }
        (Object.getPrototypeOf(original) as ControllerConstructorIntern).__allCustomElements.push(config.selector);

        window.customElements.define(config.selector, original);

        return original as any;
    };
}