import {PropertyCommitter} from 'lit-html';

class ClassPropertyCommitter extends PropertyCommitter {

    commit(): void {
        if (this.dirty) {
            this.dirty = false;

            const value = !!this._getValue();
            this.element.classList.toggle(this.name, value);
        }
    }
}

export function createPropertyCommitter(element: Element, name: string, strings: ReadonlyArray<string>): PropertyCommitter {
    if (name.startsWith('class.')) {
        return new ClassPropertyCommitter(element, name.substring(6), strings);
    }
    return new PropertyCommitter(element, name, strings);
}