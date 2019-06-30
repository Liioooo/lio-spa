import {PropertyCommitter} from 'lit-html';
import {isBinding} from './bindings';
import {InjectService} from '../decorators/inject-service-decorator';
import {ApplicationService} from '../application-service';

export class TwoWayPropertyCommitter extends PropertyCommitter {

    private readonly _eventName: string;
    private readonly _elementAccessor: string;
    private _binding: any = null;

    @InjectService(ApplicationService)
    applicationService: ApplicationService;

    public constructor(element: Element, property: string, strings: ReadonlyArray<string>, private runChangeDetection: boolean) {
        super(element, property, strings);

        this._eventName = 'input';
        this._elementAccessor = 'value';

        if (element instanceof HTMLInputElement && element.type === 'checkbox') {
            this._eventName = 'change';
            this._elementAccessor = 'checked';
        }
    }

    commit(): void {
        if (this.dirty) {
            this.dirty = false;
            const value = this._getValue();

            if (isBinding(value)) {
               if (this._binding === null) {
                   this.element.addEventListener(this._eventName, this);
               }

               this._binding = value;
               (this.element as any)[this._elementAccessor] = value.get();
            } else {
                throw Error('You must use the bind() function in order to use [(lio-model)]');
            }
        }
    }

    handleEvent() {
        this._binding!.set((this.element as any)[this._elementAccessor]);
        if (this.runChangeDetection) {
            this.applicationService.updateApplicationDOM();
        }
    }

}

export function createTwoWayPropertyCommitter(element: Element, name: string, strings: ReadonlyArray<string>): PropertyCommitter {

    const bindingConfig = name.split(':');
    const runCd = !(bindingConfig.length === 2 && bindingConfig[1].startsWith('noChangeDet'));
    return new TwoWayPropertyCommitter(element, name, strings, runCd);
}