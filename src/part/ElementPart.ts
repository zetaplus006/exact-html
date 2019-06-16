import { hasOwn, isPrimitive, isSimpleType, isUndef } from '../common/lang';
import { HtmlTemplate } from '../core/HtmlTemplate';
import { TemplateResult } from '../core/TemplateResult';
import { ElementDirective } from '../directive/ElementDirective';
import { ComponentDirective } from '../directive/implements/component';
import { MapDirective } from '../directive/implements/map';
import { TemplateDirective } from '../directive/implements/template';
import { TextDirective } from '../directive/implements/text';
import { IAllPartParamTypes, IPartParam } from '../interfaces/IPart';
import { BasePart } from './BasePart';

type ValueType = 'simple' | 'template' | 'component' | 'unknow';

function getValueType(val: any): ValueType {
    if (isSimpleType(val)) {
        return 'simple';
    } else if (val instanceof TemplateResult) {
        return 'template';
    } else if (hasOwn(val, 'ctor') && val!['ctor'].prototype instanceof ElementDirective
        && Array.isArray(val!['valueArgs'])) {
        return 'component';
    } else {
        return 'unknow';
    }
}

function getElementDirective(part: ElementPart, param: IAllPartParamTypes, valueType: ValueType) {
    let directive!: TextDirective | TemplateDirective | ComponentDirective;
    if (valueType === 'simple') {
        directive = new TextDirective(param as any);
    } else if (valueType === 'template') {
        directive = new TemplateDirective(param as TemplateResult);
    } else if (valueType === 'component') {
        const p = param as IPartParam;
        directive = new param!['ctor'](...p.valueArgs);
    } else {
        throw new Error('element directive is not found');
    }
    directive.firstComment = part.firstComment;
    directive.lastComment = part.lastComment;
    return directive;
}

export class ElementPart extends BasePart {

    firstComment!: Comment;
    lastComment!: Comment;

    value: any;

    valueType!: ValueType;

    directive!: ElementDirective;

    init(partParam: IAllPartParamTypes): void {
        this.value = partParam;
        this.valueType = getValueType(partParam);
        this.directive = getElementDirective(this, this.value, this.valueType);
        this.directive.bind();
    }

    update(partParam: IAllPartParamTypes): void {
        // todo directive可能需要转化
        const newType = getValueType(partParam);
        if (this.valueType !== newType) {
            this.destroy();
            this.init(partParam);
        } else {
            this.value = partParam;
            if (isPrimitive(this.value) || isUndef(this.value) || this.value instanceof TemplateResult) {
                this.directive.update(this.value);
            } else {
                this.directive.update.apply(this.directive, this.value.valueArgs);
            }
        }

    }

    destroy(): void {
        this.directive.unbind();
    }

}
