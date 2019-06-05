import { noop } from '../../common/lang';
import { simpleType } from '../../interfaces/IPart';
import { ElementDirective } from '../ElementDirective';

export class TextDirective extends ElementDirective {

    el!: Text;

    constructor(private value: simpleType) {
        super();
    }

    bind() {
        if (this.firstComment.nextSibling === this.lastComment) {
            this.el = document.createTextNode('');
            const parent = this.firstComment.parentNode;
            if (parent) {
                parent.insertBefore(this.el, this.lastComment);
            } else {
                throw new Error('found not parent');
            }
        }
        this.updateDom();
    }

    update(text: any): void {
        if (this.value === text) {
            return;
        }
        this.value = text;
        this.updateDom();
    }

    unbind() {
        this.el.remove();
    }

    private updateDom() {
        if (typeof this.value === 'string') {
            this.el.textContent = this.value;
        } else if (typeof this.value === 'number' || typeof this.value === 'symbol') {
            this.el.textContent = String(this.value);
        } else {
            this.el.textContent = '';
        }
    }

}
