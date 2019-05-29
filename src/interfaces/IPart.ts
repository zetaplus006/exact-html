import { TemplateResult } from '../core/TemplateResult';
import { Directive } from '../directive/factory';

export type ICtor<T> = new (...args: any[]) => T;

export interface IPartParam {
    valueArgs: any[];
    ctor: ICtor<any>;
    type: any;
    serverRender?: (...arg: any[]) => string;
}

export type simpleType = string | number | symbol | boolean | undefined | null;

export type IAllPartParamTypes = IPartParam | TemplateResult | simpleType;

export interface IPart {

    new(partParmas: IAllPartParamTypes): this;

    index: number;

    /**
     * attribute
     * element =>{ 1.text 2.template 3.Component}
     * 一共4种part
     */
    partType: string;

    valueArgs?: any[];

    ctor?: ICtor<Directive>;

    value?: string | TemplateResult;

}
