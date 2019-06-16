export function Component(config: {
    selector: string,
    styles?: string
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
            }
        });

        window.customElements.define(config.selector, original);

        return original as any;
    };
}