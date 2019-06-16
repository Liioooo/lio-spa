import {Controller} from "./controller";

export class OutputEmitter<T = any> {

    private __hostElement: Controller;
    private __eventName: string;

    public emit(data: T) {
        if (!this.__hostElement) {
            throw Error('The Output() decorator is missing');
        }
        this.__hostElement.dispatchEvent(new CustomEvent(this.__eventName, {
            detail: data
        }));
    }
}