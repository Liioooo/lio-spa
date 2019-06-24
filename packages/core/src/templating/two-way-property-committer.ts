import {PropertyCommitter} from 'lit-html';
import {isBinding} from './bindings';

export class TwoWayPropertyCommitter extends PropertyCommitter {

    private readonly _eventName: string;
    private readonly _elementAccessor: string;
    private _binding: any = null;

    public constructor(element: Element, property: string, strings: ReadonlyArray<string>) {
        super(element, property, strings);

        this._eventName = 'input';
        this._elementAccessor = 'value';
    }

    commit(): void {
        if (this.dirty) {
            this.dirty = false;
            const value = this._getValue();

            if (isBinding(value)) {
               if (this._binding === null) {
                   this.element.addEventListener(this._eventName, this);
               }

               this._binding = value;
               (this.element as any)[this._elementAccessor] = value.get();
            } else {
                throw Error('You must use the bind() function in order to use [(lio-model)]');
            }
        }
    }

    handleEvent() {
        this._binding!.set((this.element as any)[this._elementAccessor]);
    }

}

export function createTwoWayPropertyCommitter(element: Element, property: string, strings: ReadonlyArray<string>): PropertyCommitter {
    return new TwoWayPropertyCommitter(element, property, strings);
}