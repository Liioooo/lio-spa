export class ActivationDeniedError extends Error {

    constructor(message: string = undefined) {
        super();
        this.name = 'ActivationDeniedError';
    }

}