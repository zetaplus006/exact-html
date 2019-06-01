import { BasePart } from './BasePart';

export class CommentPart extends BasePart {

    comment!: Comment;

    strings!: string[];

    value: any;

    init(partParam: string): void {
        this.value = partParam;
    }

    update(partParam: string): void {
        this.value = partParam;
    }

    destroy(): void {
        // todo
    }

}
