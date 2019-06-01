
import { IAllPartParamTypes } from '../interfaces/IPart';

export abstract class BasePart {

    index!: number;

    /**
     * attribute 1
     * element  2 =>{ 1.text 2.template 3.Component}
     * 一共4种part
     */
    partType!: number;

    valueArgs!: any[];

    // value!: string | ITemplateResult; //

    // tslint:disable-next-line:no-empty
    constructor(index: number) {
        this.index = index;
    }

    abstract init(partParam: IAllPartParamTypes, ...args: any[]): void;

    abstract update(partParam: IAllPartParamTypes): void;

    abstract destroy(): void;

}
