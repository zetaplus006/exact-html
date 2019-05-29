import { noop } from '../../common/lang';
import { simpleType } from '../../interfaces/IPart';
import { ElementDirective } from '../ElementDirective';

export class TextDirective extends ElementDirective {

    el!: Text;

    constructor(private text: simpleType) {
        super();
    }

    bind() {
        this.updateDom();
    }

    update(text: string): void {
        if (this.text === text) {
            return;
        }
        this.updateDom();
    }

    unbind = noop;

    private updateDom() {
        if (typeof this.text === 'string') {
            this.el.textContent = this.text;
        } else if (typeof this.text === 'number') {
            this.el.textContent = String(this.text);
        } else {
            this.el.textContent = '';
        }

    }

}
