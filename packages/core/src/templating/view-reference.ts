import {Part} from 'lit-html';
import {isBinding} from './bindings';

export class ViewReferencePart implements Part {

    public value: any = null;
    private _dirty = true;

    constructor(private _element: Element) {}

    commit(): void {
        if (this._dirty) {
            this._dirty = false;

            const value = this.value;

            if (isBinding(value)) {
                if (value.get() !== this._element) {
                    value.set(this._element);
                }
            } else {
                throw Error('You must use the bind() function in order to use #ref');
            }
        }
    }

    setValue(value: unknown): void {
        this._dirty = value !== this.value;
        this.value = value;
    }

}

export function createViewReferencePart(element: Element): Part {
    return new ViewReferencePart(element);
}