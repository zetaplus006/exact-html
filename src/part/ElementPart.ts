import { IAllPartParamTypes } from '../interfaces/IPart';
import { BasePart } from './BasePart';

export class ElementPart extends BasePart {

    firstComment!: Comment;
    lastComment!: Comment;

    value: any;

    init(partParam: IAllPartParamTypes): void {
        this.value = partParam;
    }

    update(partParam: IAllPartParamTypes): void {
        this.value = partParam;
    }

    destroy(): void {
        // todo
    }

}
