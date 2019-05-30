import { HtmlTemplate } from '../core/HtmlTemplate';
import { TemplateResult } from '../core/TemplateResult';

export abstract class Component<T extends object> {

    constructor(public props: T) {

    }

    private _templateResult!: TemplateResult;

    private _htmlTemplate!: HtmlTemplate;

    /**
     * 执行render获取新的TemplateResult进行转换和更新
     */
    update() {
        // todo
    }

    appendTo(_el: Element): void {
        // todo
    }

    abstract render(): TemplateResult;
}
