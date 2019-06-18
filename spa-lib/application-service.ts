import {Service} from './decorators/service-decorator';
import {Controller} from './controller';

@Service()
export class ApplicationService {

    private __appRoot: Controller;

    /**
     * updates DOM for the enitre App
     */
    public updateApplicationDOM() {
        this._appRoot.updateChildrenDOM();
    }

    /**
     * @return Controller Component marked with applicationRoot: true
     */
    public get _appRoot(): Controller {
        if (!this.__appRoot) {
            this.__appRoot = document.querySelector('[applictation_root_comp]');
        }
        return this.__appRoot;
    }

}