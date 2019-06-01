import { AttributeDirective } from '../directive/AttributeDirective';
import { ICtor, IPartParam } from '../interfaces/IPart';
import { BasePart } from './BasePart';

export class AttributePart extends BasePart {

    el!: Element;

    ctor!: ICtor<AttributeDirective>;

    directive!: AttributeDirective;
    init(partParam: IPartParam): void {
        this.ctor = partParam.ctor;
        this.valueArgs = partParam.valueArgs;
        this.partType = partParam.type;
        this.directive = new this.ctor(...this.valueArgs);
        this.directive.el = this.el;
        this.directive.bind();
    }

    update(partParam: IPartParam): void {
        if (partParam.ctor !== this.ctor) {
            this.directive.unbind();
            this.ctor = partParam.ctor;
            this.init(partParam);
        } else {
            this.valueArgs = partParam.valueArgs;
            this.directive.update.apply(this.directive, this.valueArgs);
        }
    }

    destroy(): void {
        this.directive.unbind();
    }

}
