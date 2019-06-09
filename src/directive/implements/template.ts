import isequal from 'lodash.isequal';
import { HtmlTemplate } from '../../core/HtmlTemplate';
import { TemplateResult } from '../../core/TemplateResult';
import { ElementDirective } from '../ElementDirective';

export class TemplateDirective extends ElementDirective {

    template!: HtmlTemplate;

    constructor(private templateResult: TemplateResult) {
        super();
    }

    bind(): void {
        this.template = this.templateResult.transformToHtmlTemplate();
        this.template.init();
        this.firstComment.parentNode!.insertBefore(this.template.documentFragment, this.lastComment);
    }
    update(newResult: TemplateResult): void {
        // debugger;
        const { templateResult, template } = this;
        if (templateResult.templateArray !== newResult.templateArray) {
            /**
             * ${
             *      isloading?html`<div>loading...<div>`:<div>content...</div>
             * }
             * 针对模板转换的情况
             */
            this.unbind();
            this.templateResult = newResult;
            this.bind();
        } else {
            // 这里不需要再进行比较了，因为每个指令内部都会进行比较判断更新
            templateResult.partParams = newResult.partParams;
            template.update(templateResult.partParams);
        }
    }
    unbind(): void {
        this.template.destroy();
        this.removeAllNode();
    }

}
