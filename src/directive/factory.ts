import { IAllPartParamTypes, ICtor } from '../interfaces/IPart';
import { ElementDirective } from './ElementDirective';
import { AttrDirective } from './implements/attr';
import { DirectiveType } from './type';

export type Directive = AttrDirective | ElementDirective;

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
    return ctor.prototype instanceof AttrDirective
        ? DirectiveType.Attribute
        : ctor.prototype instanceof ElementDirective ? DirectiveType.Element : 0;
}
