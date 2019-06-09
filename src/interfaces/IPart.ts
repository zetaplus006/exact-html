import { TemplateResult } from '../core/TemplateResult';
export type ICtor<T> = new (...args: any[]) => T;

export interface IPartParam {
    valueArgs: any[];
    ctor: ICtor<any>;
    type: any;
    serverRender?: (...arg: any[]) => string;
}

export type simpleType = string | number | symbol | boolean | undefined | null;

export type IAllPartParamTypes = IPartParam | TemplateResult | simpleType;
