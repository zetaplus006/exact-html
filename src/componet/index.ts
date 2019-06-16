import { HtmlTemplate } from '../core/HtmlTemplate';
import { TemplateResult } from '../core/TemplateResult';
import { ICtor, IPartParam } from '../interfaces/IPart';

export abstract class Component<T extends object> {

    _templateResult!: TemplateResult;

    _htmlTemplate!: HtmlTemplate;

    _isInit = true;

    constructor(public readonly props: T) {
    }

    _init() {
        this._isInit = true;
        this.update();
    }

    shouldUpdate(_prevProps: T) {
        return true;
    }

    /**
     * 执行render获取新的TemplateResult进行转换和更新
     */
    update() {
        if (this._isInit) {
            this._templateResult = this.render();
            this._htmlTemplate = this._templateResult.transformToHtmlTemplate();
            this._htmlTemplate.init();
            this._isInit = false;
            return;
        }
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

    _destory() {
        this._htmlTemplate.destroy();
    }

    appendTo(el: Element): void {
        // todo
        this._htmlTemplate.appendTo(el);
    }

    abstract render(): TemplateResult;
}
