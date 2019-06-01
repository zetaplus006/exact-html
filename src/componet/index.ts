import { HtmlTemplate } from '../core/HtmlTemplate';
import { TemplateResult } from '../core/TemplateResult';
import { ICtor, IPartParam } from '../interfaces/IPart';

export abstract class Component<T extends object> {

    constructor(public props: T) {

    }

    _templateResult!: TemplateResult;

    _htmlTemplate!: HtmlTemplate;

    /**
     * 执行render获取新的TemplateResult进行转换和更新
     */
    update() {
        // todo
    }

    appendTo(_el: Element): void {
        // todo
    }

    chrilrens<P extends object>(_ComponentCtor: ICtor<Component<P>>, props: P): IPartParam;
    chrilrens(...args: any[]): IPartParam {
        return {} as any;
    }

    abstract render(): TemplateResult;
}
