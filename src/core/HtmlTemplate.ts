import { BasePart } from '../part/BasePart';

export class HtmlTemplate {

    elements!: Element[];
    parts!: BasePart[];
    htmlTemplate: any;

    /**
     * part的类型可能会变，需要转换成其他part
     */
    update(): void {
        throw new Error('Method not implemented.');
    }

    destroy(): void {
        throw new Error('Method not implemented.');
    }

    mounted(): void {
        throw new Error('Method not implemented.');
    }

}
