import { ICtor } from '../interfaces/IPart';
import { Component } from './index';

export interface IAppOption {
    root: ICtor<Component<any>>;
    el: string | HTMLLIElement;

}

export class App {

    rootComponent!: Component<any>;

    constructor(private option: IAppOption) {
        this.rootComponent = new option.root();
        this.rootComponent['_init']();
        let mountedEl!: Element;
        if (typeof option.el === 'string') {
            mountedEl = document.querySelector(option.el) as any;
        } else {
            mountedEl = option.el;
        }
        this.rootComponent.appendTo(mountedEl);
    }
}
