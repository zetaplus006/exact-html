import isequal from 'lodash.isequal';
import { IPartParam } from '../../interfaces/IPart';
import { AttributeDirective } from '../AttributeDirective';
import { defDirective } from '../factory';
export class OnDirective<K extends keyof HTMLElementEventMap> extends AttributeDirective {

    constructor(
        private type: K,
        private listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        private options?: boolean | AddEventListenerOptions) {
        super();
    }

    bind(): void {
        this.el.addEventListener(this.type, this.listener, this.options);
    }

    update(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions): void {
        if (this.type === type
            &&
            this.listener === listener
            &&
            isequal(this.options, options)
        ) {
            return;
        }
        this.unbind();
        this.type = type;
        this.listener = listener;
        this.options = options;
        this.el.addEventListener(this.type, this.listener, this.options);
    }
    unbind(): void {
        this.el.removeEventListener(this.type, this.listener, this.options);
    }
}

export const on: <K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
) => IPartParam = defDirective(OnDirective as any) as any;

export const click = <K extends keyof HTMLElementEventMap>(
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
) => {
    return on('click', listener as any, options);
};
