import isequal from 'lodash.isequal';
import assign from 'object-assign';
import { Component } from '../../componet/index';
import { ICtor } from '../../interfaces/IPart';
import { ElementDirective } from '../ElementDirective';
import { defDirective } from '../factory';

type LifeCycleName = 'created' | 'beforeMounte' | 'mounted' | 'beforeDestroy' | 'destroyed';

function applyLifeCycle(instance: Component<any>, method: LifeCycleName, args?: any[]) {
    const func = instance[method];
    if (typeof func === 'function') {
        return func.apply(instance, args);
    }
}

export class ComponentDirective extends ElementDirective {

    instance!: Component<any>;

    constructor(private ctor: ICtor<Component<any>>, private props: any) {
        super();
    }

    bind(): void {
        this.instance = new this.ctor(this.props);
        this.instance['_init']();
        applyLifeCycle(this.instance, 'created');
        applyLifeCycle(this.instance, 'beforeMounte');
        this.instance['_htmlTemplate'].insertBefore(this.lastComment);
        applyLifeCycle(this.instance, 'mounted');
    }
    update(ctor: ICtor<Component<any>>, props: any): void {
        if (this.ctor !== ctor) {
            this.unbind();
            this.ctor = ctor;
            this.bind();
            // todo
        } else {
            // 这里不做更新判断，组件决定是否更新
            const oldProps = this.props;
            assign(this.instance.props, props);
            this.instance.receiveProps(oldProps);
        }
    }
    unbind(): void {
        applyLifeCycle(this.instance, 'beforeDestroy');
        this.instance['_destory']();
        this.removeAllNode();
        applyLifeCycle(this.instance, 'destroyed');
    }

}

export const child: <T extends object>(ctor: ICtor<Component<T>>, props: T) => any = defDirective(ComponentDirective);
