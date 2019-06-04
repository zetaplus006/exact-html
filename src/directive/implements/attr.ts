import { AttributeDirective } from '../AttributeDirective';
import { defDirective } from '../factory';

export class AttrDirective extends AttributeDirective {

    constructor(private attrName: string, private attrValue: string) {
        super();
    }

    bind() {
        this.updateDom();
    }

    update(attrName: string, attrValue: string): void {
        if (this.attrName === attrName && this.attrValue === attrValue) {
            return;
        }
        if (this.attrName !== attrName) {
            this.el.removeAttribute(this.attrName);
        }
        this.attrName = attrName;
        this.attrValue = attrValue;
        this.updateDom();
    }

    unbind() {
        this.el.removeAttribute(this.attrName);
    }

    private updateDom() {
        this.el.setAttribute(this.attrName, this.attrValue);
    }

}

export const attr = defDirective(AttrDirective, (attrName: string, attrValue: string) => {
    return `${attrName}=${attrValue}`;
});
