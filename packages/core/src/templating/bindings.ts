export interface Binding {
    set(value: unknown): void;
    get(): unknown;
    __binding: true;
}

export function isBinding(obj: any): obj is Binding {
    return obj != null && (obj as Binding).__binding === true;
}

export function bind<O extends Object, K extends keyof O>(controller: O, property: K): Binding {
    return {
        __binding: true,
        get() {
            return controller[property];
        },
        set(value: O[K]) {
            controller[property] = value;
        },
    } as Binding;
}