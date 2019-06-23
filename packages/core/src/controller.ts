import {render, TemplateResult} from 'lit-html';
import {OnChanges} from './lifecycle/on-changes';
import {OnDestroy} from './lifecycle/on-destroy';
import {OnInit} from './lifecycle/on-init';
import {InjectService} from './decorators/inject-service-decorator';
import {StylesService} from './styles-service';

export abstract class Controller extends HTMLElement {

    /**
     * components element-selector
    */
    private static readonly __selector?: string;

    /**
     * components styles as string
     */
    private static readonly __styles?: string;

    private static readonly __isApplicationRoot?: boolean;


    /**
     *  static property containing all custom-elements selectors
     *  used by updateChildrenDOM()
     */
    private static readonly __allCustomElements: string[];


    private readonly _renderRoot: ShadowRoot;

    /**
     * Defines if styles need to be inserted on first render, if
     * adoptive stylesheets are not supported
     */
    private _needsSytleInsertion = false;

    @InjectService(StylesService)
    private _stylesService: StylesService;

    protected constructor() {
        super();
        this.initialize();
    }

    private connectedCallback() {
        this.firstRender();
    }

    private attributeChangedCallback(name: string, oldValue: unknown, newValue: unknown) {
        this[name] = newValue;
        if (this.constructor.prototype.hasOwnProperty('onChanges') && oldValue !== newValue) {
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
        if (this._stylesService.supportsAdoptingStyleSheets) {
            if (this._stylesService.hasGlobalStyles) {
                (this._renderRoot as any as {adoptedStyleSheets: any}).adoptedStyleSheets = [
                    this._stylesService.globalStyleSheet,
                    this._stylesService.convertToStyleSheet((this.constructor as typeof Controller).__styles)
                ];
            } else {
                (this._renderRoot as any as {adoptedStyleSheets: any}).adoptedStyleSheets = [
                    this._stylesService.convertToStyleSheet((this.constructor as typeof Controller).__styles)
                ];
            }
        } else {
            this._needsSytleInsertion = true;
        }
    }

    private firstRender() {
        if ((this.constructor as typeof Controller).__isApplicationRoot) {
            this.setAttribute('applictation_root_comp', '');
        }

        if (this.constructor.prototype.hasOwnProperty('onInit')) {
            (this as any as OnInit).onInit();
        }

        this.updateOwnDOM();

        // When adoptedStyles are not supported, insert styling after rendering to
        // ensure adoptedStyles have highest priority.
        const stylesText = (this.constructor as typeof Controller).__styles;
        if (stylesText && this._needsSytleInsertion) {
            if (this._stylesService.hasGlobalStyles) {
                this.insertCss(this._stylesService.globalStyles);
            }
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