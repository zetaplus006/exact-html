import { BasePart } from './BasePart';

export class TextPart extends BasePart {

    el!: Text;

    value: string | undefined | null;

    setState(partParam: string): void {
        this.value = partParam;
    }

    update(partParam: string): void {
        this.value = partParam;
    }

    destroy(): void {
        // todo
    }

}
