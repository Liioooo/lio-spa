import {Service} from "./decorators/service-decorator";
import {Controller} from "./controller";

@Service()
export class ApplicationService {

    private __appRoot: Controller;

    public updateApplicationDOM() {
        this._appRoot.updateChildrenDOM();
    }

    public get _appRoot(): Controller {
        if (!this.__appRoot) {
            this.__appRoot = document.querySelector('[applictation_root_comp]') as Controller;
        }
        return this.__appRoot;
    }

}