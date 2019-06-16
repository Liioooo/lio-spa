import {Controller} from "../controller";

export function InjectService(service: any) {
    return function (target: Controller, propertyName: string) {

        Object.defineProperty(target, propertyName, {
            get: () => {
                return service['getInstance']()
            }
        });
    }
}