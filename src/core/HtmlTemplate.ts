import { IAllPartParamTypes } from '../interfaces/IPart';
import { BasePart } from '../part/BasePart';

export class HtmlTemplate {

    templateElement!: HTMLTemplateElement;

    documentFragment!: DocumentFragment;

    parts!: BasePart[];

    partParams!: IAllPartParamTypes[];

    init() {
        this.updateDom(true);
    }

    update(partParams: IAllPartParamTypes[]): void {
        this.partParams = partParams;
        this.updateDom(false);
    }

    destroy(): void {
        const { parts } = this;
        const len = parts.length;
        let index = 0;
        while (index < len) {
            parts[index].destroy();
            index++;
        }
    }

    appendTo(el: Element): void {
        el.appendChild(this.documentFragment);
    }

    insertBefore(el: Comment | Node) {
        el.parentNode!.insertBefore(this.documentFragment, el);
    }

    private updateDom(isInit: boolean) {
        const { parts, partParams } = this;
        const method = isInit ? 'init' : 'update';
        const len = parts.length;
        let index = 0;
        while (index < len) {
            parts[index][method](partParams[index]);
            index++;
        }
    }
}
