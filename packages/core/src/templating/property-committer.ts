import {PropertyCommitter} from 'lit-html';

export function createPropertyCommitter(element: Element, property: string, strings: ReadonlyArray<string>): PropertyCommitter {
    return new PropertyCommitter(element, property, strings);
}