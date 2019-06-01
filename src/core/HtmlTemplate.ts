import { IAllPartParamTypes } from '../interfaces/IPart';
import { BasePart } from '../part/BasePart';

export class HtmlTemplate {
    elements!: Element[];

    templateElement!: HTMLTemplateElement;

    parts!: BasePart[];

    partParams!: IAllPartParamTypes[];


    init() {
        this.updateDom(true);
    }

    /**
     * part的类型可能会变，需要转换成其他part
     */
    update(partParams: IAllPartParamTypes[]): void {
        this.partParams = partParams;
        this.updateDom(false);
    }

    destroy(): void {
        throw new Error('Method not implemented.');
    }

    appendTo(el: HTMLElement): void {
        el.appendChild(this.templateElement.content);
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
