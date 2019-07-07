## Services

Most of the Application-Logic is located in services.
Services are singletons, this means that the sate of them is hold during the entire runtime of the application.

An example service file:
```ts
import {InjectService, Router, Service} from '@lio-spa/core';

@Service()
export class AuthService {

    @InjectService(Router)
    private routerService: Router;

    public someMethod() {
    }
}
```

Services are defined with the `@Service()` decorator and can be injected into Components and other Services with use of the `@InjectService()` decorator.

