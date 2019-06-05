import { isPrimitive, isUndef } from '../common/lang';
import { TemplateResult } from '../core/TemplateResult';
import { ElementDirective } from '../directive/ElementDirective';
import { TemplateDirective } from '../directive/implements/template';
import { TextDirective } from '../directive/implements/text';
import { IAllPartParamTypes } from '../interfaces/IPart';
import { BasePart } from './BasePart';

export class ElementPart extends BasePart {

    firstComment!: Comment;
    lastComment!: Comment;

    value: any;

    directive!: ElementDirective;

    init(partParam: IAllPartParamTypes): void {
        this.value = partParam;
        this.directive = getElementDirective(this, this.value);
        this.directive.bind();
    }

    update(partParam: IAllPartParamTypes): void {
        // todo directive可能需要转化
        this.value = partParam;
        this.directive.update(this.value);
    }

    destroy(): void {
        // todo
    }

}

export function getElementDirective(part: ElementPart, param: IAllPartParamTypes) {
    let directive!: TextDirective | TemplateDirective;
    if (isPrimitive(param) || isUndef(param)) {
        directive = new TextDirective(param as any);

    } else if (param instanceof TemplateResult) {
        directive = new TemplateDirective(param);
    }
    directive.firstComment = part.firstComment;
    directive.lastComment = part.lastComment;
    return directive;
}
