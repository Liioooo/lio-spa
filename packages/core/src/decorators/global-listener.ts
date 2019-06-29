import {Controller} from '../controller';
import {Service} from '../interfaces';
import {OnInit} from '../lifecycle/on-init';
import {OnDestroy} from '../lifecycle/on-destroy';
import {ApplicationService} from '../application-service';

export function GlobalListener(eventConfigString: string, runChangeDetection: boolean = true) {
    return function (target: Controller, propertyName: string, descriptor: PropertyDescriptor) {

        const eventConfig = eventConfigString.split(':');
        let eventTarget: Window | Document;
        switch (eventConfig[0]) {
            case 'window':
                eventTarget = window;
                break;
            case 'document':
                eventTarget = document;
                break;
            default:
                throw Error('Event must pe placed on "window" or "document"');
        }

        let originalOnInit: Function;
        let originalOnDestroy: Function;

        if (target.hasOwnProperty('onInit')) {
            originalOnInit = (target as any as OnInit).onInit;
        } else {
            originalOnInit = function () {};
        }

        if (target.hasOwnProperty('onDestroy')) {
            originalOnDestroy = (target as any as OnDestroy).onDestroy;
        } else {
            originalOnDestroy = function () {};
        }

        let boundHandleEvent: any;

        (target as any as OnInit).onInit = function () {
            boundHandleEvent = handleEvent.bind(this);
            eventTarget.addEventListener(eventConfig[1], boundHandleEvent);
            originalOnInit.apply(this);
        };

        (target as any as OnDestroy).onDestroy = function () {
            eventTarget.removeEventListener(eventConfig[1], boundHandleEvent);
            originalOnDestroy.apply(this);
        };

        const handleEvent = function(e) {
            (target[propertyName] as Function).apply(this, [e]);
            if (runChangeDetection) {
                ((ApplicationService as any as Service).getInstance() as ApplicationService).updateApplicationDOM();
            }
        };
    };
}