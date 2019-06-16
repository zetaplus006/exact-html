import { IAllPartParamTypes, IPartParam } from '../../interfaces/IPart';
import { ElementDirective } from '../ElementDirective';
import { defDirective } from '../factory';

type RenderParam = IPartParam & { key: string | number };

export class MapDirective<T = any> extends ElementDirective {

    directives!: ElementDirective[];

    documentFragment!: DocumentFragment;

    map = new Map<string | number, ElementDirective>();

    constructor(
        public data: T[],
        public getKey: (item: T, index: number) => string | number,
        public render: (item: T, index: number) => IPartParam
    ) {
        super();
    }

    bind(): void {
        const parent = this.lastComment.parentNode!;
        const fr = this.documentFragment = document.createDocumentFragment();
        const renderData = this._getRenderData();
        this.directives = renderData.map((item, index) => {
            const directive = this._createDirective(item, index);
            fr.appendChild(directive.firstComment);
            fr.appendChild(directive.lastComment);
            directive.bind();
            this.map.set(directive.key, directive);
            return directive;
        });
        parent.insertBefore(fr, this.lastComment);
    }

    update(
        data: T[],
        getKey: (item: T, index: number) => string | number,
        render: (item: T) => any): void {
        console.time()
        this.data = data;
        this.getKey = getKey;
        this.render = render;
        const newrenderData = this._getRenderData();

        const newMap = new Map<string | number, ElementDirective>();
        const newDirs = [];
        // tslint:disable-next-line:no-shadowed-variable
        const oldMap = this.map;

        let index = 0;
        const len = newrenderData.length;
        let dir: ElementDirective | undefined;
        let key: string | number;
        let param: RenderParam;
        const parentNode = this.lastComment.parentNode!;
        while (index < len) {
            param = newrenderData[index];
            if (!param) {
                continue;
            }
            key = param.key;
            dir = oldMap.get(key);
            if (!dir) {
                dir = this._createDirective(param, index);
                parentNode.insertBefore(dir.firstComment, this.lastComment);
                parentNode.insertBefore(dir.lastComment, this.lastComment);
            }
            newDirs.push(dir);
            newMap.set(key, dir!);
            index++;
        }

        const oldDirs = this.directives;
        const oldKeys = oldDirs.map(item => item.key);
        const newKeys = newDirs.map(item => item.key);

        let oldHead = 0;
        let oldTail = oldKeys.length - 1;
        let newHead = 0;
        let newTail = newKeys.length - 1;
        /**
         * change from https://github.com/Polymer/lit-html/blob/master/src/directives/repeat.ts#L90
         */
        while (oldHead <= oldTail && newHead <= newTail) {
            if (oldKeys[oldHead] === newKeys[newHead]) {
                oldDirs[oldHead].update(...newrenderData[newHead].valueArgs);
                oldHead++;
                newHead++;
            } else if (oldKeys[oldTail] === newKeys[newTail]) {
                oldDirs[oldTail].update(...newrenderData[newTail].valueArgs);
                oldTail--;
                newTail--;
            } else if (oldKeys[oldHead] === newKeys[newTail]) {
                oldDirs[oldHead].update(...newrenderData[newTail].valueArgs);
                oldDirs[oldHead].insertBefore(parentNode, this._getBeforeNode(newDirs[newTail + 1]));
                oldHead++;
                newTail--;
            } else if (oldKeys[oldTail] === newKeys[newHead]) {
                oldDirs[oldTail].update(...newrenderData[newHead].valueArgs);
                oldDirs[oldTail].insertBefore(parentNode, this._getBeforeNode(newDirs[newHead]));
                oldTail--;
                newHead++;
            } else if (!newMap.has(oldKeys[oldHead])) {
                oldDirs[oldHead].unbind();
                oldDirs[oldHead].removeMark();
                oldHead++;
            } else if (!newMap.has(oldKeys[oldTail])) {
                oldDirs[oldTail].unbind();
                oldDirs[oldTail].removeMark();
                oldTail--;
            } else {
                newDirs[newHead].bind();
                newDirs[newHead].insertBefore(parentNode, this._getBeforeNode(oldDirs[oldHead]));
                newHead++;
            }
        }

        while (newHead <= newTail) {
            newDirs[newHead].bind();
            newDirs[newHead].insertBefore(parentNode, this._getBeforeNode(newDirs[newTail + 1]));
            newHead++;
        }

        while (oldHead <= oldTail) {
            oldDirs[oldHead].unbind();
            oldDirs[oldHead].removeMark();
            oldHead++;
        }

        this.map = newMap;
        this.directives = newDirs;
        console.timeEnd()
    }

    unbind(): void {
        this.data = undefined as any;
        this.getKey = undefined as any;
        this.render = undefined as any;
        this.directives.forEach(dir => dir.unbind());
        throw new Error('Method not implemented.');
    }

    private _getBeforeNode(dir: ElementDirective) {
        return dir && dir.firstComment || this.lastComment;
    }

    private _getRenderData(): RenderParam[] {
        const { data, getKey, render } = this;
        let key, itemData;
        const renderData = data.map((item, index) => {
            key = getKey(item, index);
            itemData = render(item, index);
            (itemData as any).key = key;
            return itemData;
        });
        return renderData as any;
    }

    private _createDirective(param: RenderParam, index: number): ElementDirective {
        const directive = new param.ctor(...param.valueArgs) as ElementDirective;
        directive.key = param.key;
        directive.index = index;
        directive.firstComment = new Comment(param.key as any);
        directive.lastComment = new Comment(param.key as any);
        return directive;
    }
}

export const map: <T>(
    data: T[],
    getKey: (item: T, index: number) => string | number,
    render: (item: T, index: number) => any) => IAllPartParamTypes
    = defDirective(MapDirective);
