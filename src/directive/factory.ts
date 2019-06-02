import { IAllPartParamTypes, ICtor } from '../interfaces/IPart';
import { AttributeDirective } from './AttributeDirective';
import { ElementDirective } from './ElementDirective';
import { DirectiveType } from './type';

export type Directive = AttributeDirective | ElementDirective;

export function defDirective(
    ctor: ICtor<Directive>,
    serverRender?: (...arg: any[]) => string
): (...args: any[]) => IAllPartParamTypes {
    const type = getDirectiveType(ctor);
    return function (...args: any[]) {
        return {
            valueArgs: args,
            ctor,
            type,
            serverRender
        };
    };
}

function getDirectiveType(ctor: ICtor<Directive>): number {
    return ctor.prototype instanceof AttributeDirective
        ? DirectiveType.Attribute
        : ctor.prototype instanceof ElementDirective ? DirectiveType.Element : 0;
}
