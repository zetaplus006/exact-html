
import { isSever } from '../common/env';
import { hasOwn, isObj } from '../common/lang';
import { TemplateResult } from '../core/TemplateResult';
import { AttributeDirective } from '../directive/AttributeDirective';
import { MapDirective } from '../directive/implements/map';
import { getSimpleTypeString } from '../directive/implements/text';
import { ICtor, IPartParam, simpleType } from '../interfaces/IPart';
import { getValueType } from '../part/ElementPart';
import { ValueType } from '../part/ElementPart';
import { Component } from './index';

export interface IAppOption {
    root: ICtor<Component<any>>;
    el?: string | HTMLLIElement;

    context?: any;

}

export class App {

    context: any;

    rootComponent!: Component<any>;

    constructor(private option: IAppOption) {
        this.rootComponent = new option.root();
        this.rootComponent._init();
        if (!isSever) {
            let mountedEl!: Element;
            if (typeof option.el === 'string') {
                mountedEl = document.querySelector(option.el) as any;
            } else if (option.el) {
                mountedEl = option.el;
            }
            this.rootComponent.appendTo(mountedEl);
        }
    }

    public renderToString () {
        return renderToString(this.rootComponent._templateResult, {
            app: this,
            stackIndex: 0,
            arrayIndex: 0
        });
    }
}

interface IRenderOption {
    app: App;
    stackIndex: number;
    arrayIndex: number;
}

export function renderToString (templateResult: TemplateResult, option: IRenderOption) {
    const { templateArray, partParams } = templateResult;
    const len = templateArray.length;
    const endIndex = len - 2;
    let index = 0;
    let str = '';
    let type: ValueType;
    let partValue: IPartParam;
    let partStr: string;
    while (index < len) {
        const value = partParams[index];
        str += templateArray[index];
        if (index > endIndex) {
            break;
        }
        type = getValueType(value);
        if (type === 'simple') {
            str += makeElMark(getSimpleTypeString(value as simpleType), index, option.stackIndex, false);
        } else if (type === 'template') {
            str += makeElMark(renderToString(value as TemplateResult,
                { app: option.app, stackIndex: option.stackIndex + 1, arrayIndex: index }),
                index, option.stackIndex, true);
            // tslint:disable-next-line:no-empty
        } else if (type === 'component') {
            partValue = value as IPartParam;
            partStr = partValue.serverRender
                && partValue.serverRender.apply(null, partValue.valueArgs) || '';
            // map指令会自己特殊处理
            str += makeElMark(partStr, index, option.stackIndex, partValue.ctor !== MapDirective);
        } else if (isObj(value) && hasOwn(value, 'ctor')
            && value!['ctor'].prototype instanceof AttributeDirective
            && Array.isArray(value!['valueArgs'])) {
            partValue = value as IPartParam;
            partStr = partValue.serverRender
                && partValue.serverRender.apply(null, partValue.valueArgs) || '';
            str += makeAttrMark(partStr, index);
        }
        index++;
    }
    return str;
}

export function makeElMark (str: string, index: number, stackIndex: number, isTemplate: boolean) {

    return [
        `${isTemplate ? `<!--$$-start_${stackIndex}-->` : ''}<!--$$-e_${stackIndex}_${index}-->`,
        str,
        `<!--$$-ee-${stackIndex}-->${isTemplate ? `<!--$$-end_${stackIndex}-->` : ''}`].join('');
}

export function makeAttrMark (str: string, index: number) {
    return ` $$-a_${index} ${str} `;
}
