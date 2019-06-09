import isequal from 'lodash.isequal';
import { IAllPartParamTypes } from '../../interfaces/IPart';
import { AttributeDirective } from '../AttributeDirective';
import { defDirective } from '../factory';

export interface IClassesOption { [key: string]: boolean; }
export class ClassesDirective extends AttributeDirective {

    el!: HTMLElement;

    constructor(private option: IClassesOption) {
        super();
    }

    bind() {
        this.setClassName();
    }

    update(option: IClassesOption) {
        if (isequal(this.option, option)) {
            this.option = option;
            return;
        }
        this.option = option;
        this.setClassName();
    }

    unbind() {
        this.el.className = '';
    }

    private setClassName() {
        this.el.className = getClassName(this.option);
    }
}

function getClassName(option: IClassesOption) {
    if (!option) {
        return '';
    }
    return Object.keys(option)
        .filter(key => Boolean(option[key])).join(' ');
}

export const classes: (option: IClassesOption) => IAllPartParamTypes
    = defDirective(ClassesDirective);
