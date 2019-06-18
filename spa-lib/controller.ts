import {render, TemplateResult} from 'lit-html';
import {OnChanges} from './lifecycle/on-changes';
import {OnDestroy} from './lifecycle/on-destroy';
import {OnInit} from './lifecycle/on-init';

export abstract class Controller extends HTMLElement {

    private static readonly __selector?: string;
    private static readonly __styles?: string;
    private static readonly __isApplicationRoot?: boolean;
    private static readonly __allCustomElements: string[];

    private readonly _renderRoot: Element | DocumentFragment;

    private _needsSytleInsertion = false;
    private _styleSheet?: CSSStyleSheet | null;

    private static readonly _supportsAdoptingStyleSheets =
        ('adoptedStyleSheets' in Document.prototype) &&
        ('replace' in CSSStyleSheet.prototype);

    protected constructor() {
        super();
        this.initialize();
    }

    private connectedCallback() {
        this.firstRender();
    }

    private attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
        this[name] = newValue;
        if (this.constructor.prototype.hasOwnProperty('onChanges')) {
            (this as any as OnChanges).onChanges(name, oldValue, newValue);
        }
        this.updateOwnDOM();
    }

    private disconnectedCallback() {
        if (this.constructor.prototype.hasOwnProperty('onDestroy')) {
            (this as any as OnDestroy).onDestroy();
        }
    }

    private initialize() {
        (this._renderRoot as ShadowRoot) = this.attachShadow({mode: 'open'});

        // There are two separate cases here based on Shadow DOM support.
        // (1) shadowRoot.adoptedStyleSheets available: use it.
        // (2) shadowRoot.adoptedStyleSheets polyfilled: append styles after
        // rendering
        if ((this.constructor as typeof Controller)._supportsAdoptingStyleSheets) {
            (this._renderRoot as any as {adoptedStyleSheets: any}).adoptedStyleSheets = [this.styleSheet];
        } else {
            this._needsSytleInsertion = true;
        }
    }

    private get styleSheet(): CSSStyleSheet|null {
        if (this._styleSheet === undefined) {
            if ((this.constructor as typeof Controller)._supportsAdoptingStyleSheets) {
                this._styleSheet = new CSSStyleSheet();
                (this._styleSheet as any).replaceSync((this.constructor as typeof Controller).__styles);
            } else {
                this._styleSheet = null;
            }
        }
        return this._styleSheet;
    }

    private firstRender() {
        if ((this.constructor as typeof Controller).__isApplicationRoot) {
            this.setAttribute('applictation_root_comp', '');
        }
        this.updateOwnDOM();

        if (this.constructor.prototype.hasOwnProperty('onInit')) {
            (this as any as OnInit).onInit();
        }

        // When native Shadow DOM is used but adoptedStyles are not supported,
        // insert styling after rendering to ensure adoptedStyles have highest
        // priority.
        const stylesText = (this.constructor as typeof Controller).__styles;
        if (stylesText && this._needsSytleInsertion) {
            this.insertCss(stylesText);
        }
        this._needsSytleInsertion = false;
    }

    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html.
     */
    protected updateOwnDOM() {
        const templateResult = this.render();
        if (templateResult instanceof TemplateResult) {
            render(templateResult, this._renderRoot, {eventContext: this});
        }
    }

    /**
     * Updates the element and all it's children. This method reflects property
     * values to attributes and calls `render` to render DOM via lit-html.
     */
    public updateChildrenDOM() {
        this.updateOwnDOM();
        (this.constructor as typeof Controller).__allCustomElements.forEach((element) => {
           const domEntries = this._renderRoot.querySelectorAll(element);
           domEntries.forEach((entry: Controller) => {
               entry.updateChildrenDOM();
           });
        });
    }

    private insertCss(css: string) {
        const styles = document.createElement('style');
        styles.setAttribute('type', 'text/css');
        styles.appendChild(document.createTextNode(css));
        this._renderRoot.appendChild(styles);
    }

    /**
     * Invoked on each update to perform rendering tasks. This method must return
     * a lit-html TemplateResult.
     */
    protected render(): TemplateResult | void {
    }
}