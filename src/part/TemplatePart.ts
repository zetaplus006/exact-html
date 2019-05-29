import { HtmlTemplate } from '../core/HtmlTemplate';
import { TemplateResult } from '../core/TemplateResult';
import { BasePart } from './BasePart';

export class TemplatePart extends BasePart {

    firstComment!: Comment;

    lastComment!: Comment;

    templateResult!: TemplateResult;

    htmlTemplate!: HtmlTemplate;

    setState(partParam: TemplateResult): void {
        this.templateResult = partParam;
    }
    update(partParam: TemplateResult): void {
        if (this.templateResult.templateArray === partParam.templateArray) {
            this.templateResult.partParams = partParam.partParams;
        } else {
            throw new Error('not the same template');
        }
    }
    destroy(): void {
        // todo
    }

}
