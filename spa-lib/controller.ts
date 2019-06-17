import {render, TemplateResult} from "lit-html";

export abstract class Controller extends HTMLElement {

    private static readonly __selector?: string;
    private static readonly __styles?: string;
    private static readonly __isApplicationRoot?: boolean;
    private static readonly __allCustomElements: string[];

    private readonly _renderRoot: ShadowRoot;

    private _needsSytleInsertion = true;

    protected constructor() {
        super();
    }

    private connectedCallback() {
        this.initialize();
    }

    private attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
        this[name] = newValue;
        if (this.constructor.prototype.hasOwnProperty('onChanges')) {
            this['onChanges'](name, oldValue, newValue);
        }
        this.updateOwnDOM();
    }

    private disconnectedCallback() {
        if (this.constructor.prototype.hasOwnProperty('onDestroy')) {
            this['onDestroy']();
        }
    }

    private initialize() {
        (this as any as {_renderRoot: ShadowRoot})._renderRoot = this.attachShadow({mode: "open"});
        if((this.constructor as typeof Controller).__isApplicationRoot) {
            this.setAttribute('applictation_root_comp', '');
        }
        this.updateOwnDOM();
        if (this.constructor.prototype.hasOwnProperty('onInit')) {
            this['onInit']();
        }
    }

    protected updateOwnDOM() {
        const templateResult = this.render();
        if (templateResult instanceof TemplateResult) {
            render(templateResult, this._renderRoot, {eventContext: this});
        }

        const stylesText = (this.constructor as typeof Controller).__styles;
        if (stylesText && this._needsSytleInsertion) {
            this._needsSytleInsertion = false;
            this.insertCss(stylesText);
        }
    }

    public updateChildrenDOM() {
        this.updateOwnDOM();
        (this.constructor as typeof Controller).__allCustomElements.forEach(element => {
           const domEntries = this._renderRoot.querySelectorAll(element);
           domEntries.forEach((entry: Controller) => {
               entry.updateChildrenDOM();
           })
        });
    }

    private insertCss(css: string) {
        let styles = document.createElement('style');
        styles.setAttribute('type', 'text/css');
        styles.appendChild(document.createTextNode(css));
        this._renderRoot.appendChild(styles);
    }

    protected render(): TemplateResult | void {
    }
}