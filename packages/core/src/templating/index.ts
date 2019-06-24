import {SVGTemplateResult, TemplateResult} from 'lit-html';
import {LioSpaProcessor} from './lio-spa-processor';

export {bind} from './bindings';
export {LioSpaProcessor};

export const lioSpaProcessor = new LioSpaProcessor();

/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 */
export const lio_html = (strings: TemplateStringsArray, ...values: unknown[]) =>
    new TemplateResult(strings, values, 'html', lioSpaProcessor);

/**
 * Interprets a template literal as an SVG template that can efficiently
 * render to and update a container.
 */
export const lio_svg = (strings: TemplateStringsArray, ...values: unknown[]) =>
    new SVGTemplateResult(strings, values, 'svg', lioSpaProcessor);