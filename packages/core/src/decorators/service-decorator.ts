export function Service() {
    return function (target: Function) {

        const original = target;

        // used to prevent instanciation with new keyword
        const instanciatedWithGetInstanceId = Symbol();


        function instanciate(constructor: any, arg: any) {
            return new constructor(arg);
        }

        const modConstructor: any = function (arg: any) {
            if (arg !== instanciatedWithGetInstanceId) {
                throw Error('Services are not allowed to be instanciated!');
            }
            const instance = instanciate(original, arg);
            return instance;
        };

        modConstructor.prototype = original.prototype;

        Object.defineProperty(modConstructor, 'getInstance', {
            value: () => {
                if (!modConstructor.instance) {
                    modConstructor.instance = instanciate(modConstructor, instanciatedWithGetInstanceId);
                }
                return modConstructor.instance;
            }
        });

        return modConstructor;
    };

}