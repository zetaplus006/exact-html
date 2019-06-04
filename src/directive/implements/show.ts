import { IAllPartParamTypes } from '../../interfaces/IPart';
import { AttributeDirective } from '../AttributeDirective';
import { defDirective } from '../factory';

export class ShowDirective extends AttributeDirective {

    realDisplay!: string | null;
    oldDisplay!: string | null;

    el!: HTMLElement;

    constructor(private value: boolean) {
        super();
    }

    bind() {
        const cssStyle = this.el.style;
        this.realDisplay = cssStyle.display;
        this.oldDisplay = cssStyle.display === 'none' ? '' : cssStyle.display;
        cssStyle.display = this.value ? this.oldDisplay : 'none';
    }

    update(value: boolean) {
        if (Boolean(this.value) === Boolean(value)) {
            return;
        }
        this.value = Boolean(value);
        this.el.style.display = this.value ? this.oldDisplay : 'none';
    }

    unbind() {
        this.el.style.display = this.realDisplay;
    }
}

export const show: (isShow: boolean) => IAllPartParamTypes = defDirective(ShowDirective);
