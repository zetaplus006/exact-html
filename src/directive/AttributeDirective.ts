
export abstract class AttributeDirective {

    el!: Element;

    /** 拿到 el 后会调用一次 */
    abstract bind(...arg: unknown[]): void;

    /** 数据变动时会进行更新 */
    abstract update(...arg: unknown[]): void;

    /** 销毁时调用 */
    abstract unbind(...arg: unknown[]): void;
}
