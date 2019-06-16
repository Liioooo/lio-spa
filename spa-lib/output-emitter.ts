import {Controller} from "./controller";

export class OutputEmitter<T = any> {

    private __hostElement: Controller;
    private __eventName: string;

    public emit(data: T) {
        this.__hostElement.dispatchEvent(new CustomEvent(this.__eventName, {
            detail: data
        }));
    }
}