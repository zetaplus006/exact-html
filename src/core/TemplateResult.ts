import { isPrimitive, isUndef } from '../common/lang';
import { IAllPartParamTypes } from '../interfaces/IPart';
import { AttributePart } from '../part/AttrbutePart';
import { TextPart } from '../part/TextPart';
import { HtmlTemplate } from './HtmlTemplate';

const marks: string[] = [];
const markIndexMap = {};
const getMark = (index: number) => {
    if (marks[index]) return marks[index];
    const mark = `$$exact_mark_${index}_$$`;
    marks[index] = mark;
    markIndexMap[mark] = index;
    return mark;
};
const getIndexByMark = (mark: string) => {
    return markIndexMap[mark];
};

const markReg = /\$\$exact_mark_([0-9]+)_\$\$/;
const markRegAll = new RegExp(markReg, 'g');
// const markRegAll = /\$\$exact_mark_([0-9]+)_\$\$/g;
const markSplitReg = /\$\$exact_mark_[0-9]+_\$\$/;
const nodeFilters = NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_TEXT + NodeFilter.SHOW_COMMENT;

export class TemplateResult {

    constructor(
        public templateArray: TemplateStringsArray,
        public partParams: IAllPartParamTypes[]) {

    }

    private getHtmlString(): string {
        const { templateArray, partParams } = this;
        let index = 0;
        const len = templateArray.length;
        const plen = partParams.length;
        let outputHtml = '';
        while (index < len) {
            outputHtml += templateArray[index];
            if (index < plen) {
                outputHtml += getMark(index);
            }
            index++;
        }
        // tslint:disable-next-line:no-console
        console.log(outputHtml);
        return outputHtml;
    }

    transformToHtmlTemplate() {
        // todo
        const htmlTemplate = new HtmlTemplate();
        htmlTemplate.parts = [];
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.getHtmlString();
        // tslint:disable-next-line:no-console
        console.log(templateElement.content);
        const walker = document.createTreeWalker(templateElement.content, nodeFilters, null);
        let el: Element | Text, currentIndex = 0;
        const reomveEls = [];
        while (walker.nextNode()) {
            const { currentNode } = walker;
            // tslint:disable-next-line:no-console
            console.log(currentIndex, currentNode);
            currentIndex++;
            // 处理element
            if (currentNode.nodeType === 1) {

                el = currentNode as Element;
                const attrs = el.attributes;
                const len = attrs.length;
                let i = 0, attr;
                const attrArray: string[] = [];
                while (i < len) {
                    attr = attrs[i];
                    // tslint:disable-next-line:no-console
                    if (new RegExp(markReg, 'g').test(attr.name)) {
                        const index = getIndexByMark(attr.name);
                        const attrPart = new AttributePart(this.partParams[index], index);
                        attrPart.el = el;
                        htmlTemplate.parts[index] = attrPart;
                        attrArray.push(attr.name);
                    }
                    i++;
                }
                attrArray.forEach(name => (el as Element).removeAttribute(name));
                // tslint:disable-next-line:no-empty
            } else if (currentNode.nodeType === 3) {
                el = currentNode as Text;
                const { textContent } = el;
                if (!textContent || !markReg.test(textContent)) {
                    continue;
                }
                const parent = el.parentNode!;
                const res = textContent.match(markRegAll);
                const strings = textContent.split(markSplitReg);
                const len = strings.length;
                let i = 0;
                while (i < len) {
                    parent.insertBefore(document.createTextNode(strings[i]), el);
                    const r = res![i];
                    if (r) {
                        const index = getIndexByMark(r);
                        const valParam = this.partParams[index];
                        if (isPrimitive(valParam) || isUndef(valParam)) {
                            const textPart = new TextPart(valParam as any, index);
                            textPart.el = document.createTextNode('');
                            parent.insertBefore(textPart.el, el);
                            htmlTemplate.parts[index] = textPart;
                        } else {
                            // todo template/component
                        }
                    }
                    i++;
                }
                reomveEls.push(el);
            } else if (currentNode.nodeType === 8) {
                // todo
            }

        }
        reomveEls.forEach(ele => ele.remove());
        // tslint:disable-next-line:no-console
        console.log(htmlTemplate, currentIndex);
    }

}
