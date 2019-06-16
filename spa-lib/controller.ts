import {render, TemplateResult} from "lit-html";

export abstract class Controller extends HTMLElement {

    private static readonly __selector?: string;
    private static readonly __styles?: string;

    readonly renderRoot: Element | DocumentFragment;

    private _needsSytleInsertion = true;

    protected constructor() {
        super();
        this.initialize();
    }

    private attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
        this[name] = newValue;
        if (this.constructor.prototype.hasOwnProperty('onChanges')) {
            this['onChanges'](name, oldValue, newValue);
        }
        this.rerender();
    }

    private disconnectedCallback() {
        if (this.constructor.prototype.hasOwnProperty('onDestroy')) {
            this['onDestroy']();
        }
    }

    private initialize() {
        (this as {renderRoot: Element | DocumentFragment}).renderRoot = this.attachShadow({mode: "open"});
        this.rerender();
        if (this.constructor.prototype.hasOwnProperty('onInit')) {
            this['onInit']();
        }
    }

    protected rerender() {
        const templateResult = this.render();
        if (templateResult instanceof TemplateResult) {
            render(templateResult, this.renderRoot, {eventContext: this});
        }

        const stylesText = (this.constructor as typeof Controller).__styles;
        if (stylesText && this._needsSytleInsertion) {
            this._needsSytleInsertion = false;
            this.insertCss(stylesText);
        }
    }

    private insertCss(css: string) {
        let styles = document.createElement('style');
        styles.setAttribute('type', 'text/css');
        styles.appendChild(document.createTextNode(css));
        this.renderRoot.appendChild(styles);
    }

    protected render(): TemplateResult | void {
    }
}