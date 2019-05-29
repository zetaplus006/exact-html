
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
    constructor(partParam: IAllPartParamTypes, index: number) {
        this.index = index;
        this.setState(partParam);
    }

    abstract setState(partParam: IAllPartParamTypes): void;

    abstract update(partParam: IAllPartParamTypes): void;

    abstract destroy(): void;

}
