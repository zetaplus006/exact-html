import { HtmlTemplate } from '../core/HtmlTemplate';
import { TemplateResult } from '../core/TemplateResult';
import { ICtor, IPartParam } from '../interfaces/IPart';

export abstract class Component<T extends object> {

    private _templateResult!: TemplateResult;

    private _htmlTemplate!: HtmlTemplate;

    constructor(public readonly props: T) {
    }

    private _init() {
        this._templateResult = this.render();
        this._htmlTemplate = this._templateResult.transformToHtmlTemplate();
        this._htmlTemplate.init();
    }

    receiveProps(_oldProps: any) {
        this.update();
    }

    /**
     * 执行render获取新的TemplateResult进行转换和更新
     */
    update() {
        // todo
        const newRes = this.render();
        if (newRes.templateArray !== this._templateResult.templateArray) {
            this._destory();
            this._templateResult = newRes;
            this._init();
        } else {
            this._htmlTemplate.update(newRes.partParams);
            this._templateResult.partParams = newRes.partParams;
        }

    }

    private _destory() {
        this._htmlTemplate.destroy();
    }

    appendTo(el: Element): void {
        // todo
        this._htmlTemplate.appendTo(el);
    }

    abstract render(): TemplateResult;
}
