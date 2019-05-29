import { AttributeDirective } from '../directive/AttributeDirective';
import { ICtor, IPartParam } from '../interfaces/IPart';
import { BasePart } from './BasePart';

export class AttributePart extends BasePart {

    el!: Element;

    ctor!: ICtor<AttributeDirective>;

    directive!: AttributeDirective;
    setState(partParam: IPartParam): void {
        this.ctor = partParam.ctor;
        this.valueArgs = partParam.valueArgs;
        this.partType = partParam.type;
        this.directive = new this.ctor(...this.valueArgs);
    }

    setEl(el: Element) {
        this.directive.el = el;
        this.directive.bind();
        this.directive.update();
    }

    update(partParam: IPartParam): void {
        if (partParam.ctor !== this.ctor) {
            this.directive.unbind();
            this.setState(partParam);
        } else {
            this.valueArgs = partParam.valueArgs;
            this.directive.update.apply(this.directive, this.valueArgs);
        }
    }

    destroy(): void {
        this.directive.unbind();
    }

}
