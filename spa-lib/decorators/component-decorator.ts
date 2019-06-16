export function Component(config: {
    selector: string,
    styles?: string,
    isApplicationRoot?: boolean
}) {
    return (target: Function) => {

        const original = target;

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

        if(!(Object.getPrototypeOf(original) as any).__allCustomElements) {
            (Object.getPrototypeOf(original) as any).__allCustomElements = [];
        }
        (Object.getPrototypeOf(original) as any as {__allCustomElements: string[]}).__allCustomElements.push(config.selector);

        window.customElements.define(config.selector, original);

        return original as any;
    };
}