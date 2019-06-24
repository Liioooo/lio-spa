import {AttributeCommitter, NodePart, Part, RenderOptions, TemplateProcessor} from 'lit-html';
import {createPropertyCommitter} from './property-committer';
import {createEventPart} from './event-part';
import {createTwoWayPropertyCommitter} from './two-way-property-committer';
import {createViewReferencePart} from './view-reference';

export class LioSpaProcessor implements TemplateProcessor {

    handleAttributeExpressions(element: Element, name: string, strings: ReadonlyArray<string>, options: RenderOptions): ReadonlyArray<Part> {

        if (name === '[(lio-model)]') {
            return createTwoWayPropertyCommitter(element, name, strings).parts;
        } else if (name ===  '#ref') {
            return [createViewReferencePart(element)];
        } else if (name.startsWith('[') && name.endsWith(']')) {
            return createPropertyCommitter(element, name.slice(1, name.length - 1), strings).parts;
        } else if (name.startsWith('(') && name.endsWith(')')) {
            return [createEventPart(element, name.slice(1, name.length - 1), strings, options.eventContext)];
        }

        const committer = new AttributeCommitter(element, name, strings);
        return committer.parts;
    }

    handleTextExpression(options: RenderOptions): NodePart {
        return new NodePart(options);
    }

}