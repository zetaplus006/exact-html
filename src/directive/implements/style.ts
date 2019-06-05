import assign from 'object-assign';
import { hasOwn } from '../../common/lang';
import { IAllPartParamTypes } from '../../interfaces/IPart';
import { AttributeDirective } from '../AttributeDirective';
import { defDirective } from '../factory';

export type styleOption = Partial<CSSStyleDeclaration> | undefined | null
    | Array<Partial<CSSStyleDeclaration> | undefined | null>;

export default class StyleDirective extends AttributeDirective {

    el!: HTMLElement;

    private styleObj: Partial<CSSStyleDeclaration>;
    constructor(option: styleOption) {
        super();
        this.styleObj = getStyleObj(option);
    }

    bind() {
        const cssStyle = this.el.style;
        const styleObj = this.styleObj;
        Object.keys(styleObj).forEach(key => cssStyle[key] = styleObj[key]);
    }

    update(styleObj: Partial<CSSStyleDeclaration>) {
        this.setStyle(styleObj);
    }

    unbind() {
        const cssStyle = this.el.style;
        const styleObj = this.styleObj;
        Object.keys(styleObj).forEach(key => cssStyle[key] = undefined);
    }

    private setStyle(option: Partial<CSSStyleDeclaration>) {
        const oldStyleObj = this.styleObj;
        const styleObj = this.styleObj = getStyleObj(option);
        const cssStyle = this.el.style;
        let key: string;
        for (key in oldStyleObj) {
            if (hasOwn(styleObj, key)) {
                cssStyle[key!] = undefined;
            }
        }
        for (key in styleObj) {
            cssStyle[key!] = styleObj[key];
        }
    }

}

function getStyleObj(option: styleOption) {
    if (Array.isArray(option)) {
        return assign({}, ...option.filter(Boolean));
    } else {
        return Object.assign({}, option || {});
    }
}

export const style: (styleObj: styleOption) => IAllPartParamTypes = defDirective(StyleDirective);
