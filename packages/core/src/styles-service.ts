import {Service} from './decorators/service-decorator';

@Service()
export class StylesService {

    private _globalStyles: string;
    private _globalStyleSheet: CSSStyleSheet;

    public get supportsAdoptingStyleSheets(): boolean {
        return ('adoptedStyleSheets' in Document.prototype) && ('replace' in CSSStyleSheet.prototype);
    }

    public set globalStyles(cssText: string) {
        if (!cssText || cssText.length === 0) {
            return;
        }
        this._globalStyles = cssText;
    }

    public get globalStyleSheet(): CSSStyleSheet {
        if (this._globalStyleSheet === undefined) {
            this._globalStyleSheet = this.convertToStyleSheet(this._globalStyles);
        }
        return this._globalStyleSheet;
    }

    public convertToStyleSheet(cssText: string): CSSStyleSheet | null {
        let sheet;
        if (this.supportsAdoptingStyleSheets) {
            sheet = new CSSStyleSheet();
            (sheet as any).replaceSync(cssText);
        } else {
            sheet = null;
        }
        return sheet;
    }

    public get hasGlobalStyles(): boolean {
        return this._globalStyles !== undefined;
    }
}