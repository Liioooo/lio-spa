import {Service} from '../interfaces';

export function InjectService(service: any) {
    return function (target: any, propertyName: string) {

        Object.defineProperty(target, propertyName, {
            get: () => {
                return (service as Service).getInstance();
            }
        });
    };
}