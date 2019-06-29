import {EventPart as LitHtmlEventPart, Part} from 'lit-html';
import {InjectService} from '../decorators/inject-service-decorator';
import {ApplicationService} from '../application-service';

export class EventPart extends LitHtmlEventPart {

    @InjectService(ApplicationService)
    applicationService: ApplicationService;

    constructor(element: Element, eventName: string, eventContext: EventTarget, private runChangeDetection: boolean) {
        super(element, eventName, eventContext);
    }

    handleEvent(event: Event): void {
        if (typeof this.value === 'function') {
            this.value.call(this.eventContext || this.element, event);
        } else {
            (this.value as EventListenerObject).handleEvent(event);
        }
        if (this.runChangeDetection) {
            this.applicationService.updateApplicationDOM();
        }
    }
}

export function createEventPart(element: Element, eventNameString: string, strings: ReadonlyArray<string>, eventContext: EventTarget): Part {

    const eventConfig = eventNameString.split(':');
    const runCd = !(eventConfig.length === 2 && eventConfig[1] === 'noChangeDet');

    return new EventPart(element, eventConfig[0], eventContext, runCd);
}