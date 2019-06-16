
export abstract class ElementDirective {

    firstComment!: Comment;

    lastComment!: Comment;

    /** key for map */
    key!: string | number;

    /** index for map */
    index!: number;

    /** 拿到 el 后会调用一次 */
    abstract bind(...arg: unknown[]): void;

    /** 数据变动时会进行更新 */
    abstract update(...arg: unknown[]): void;

    /** 销毁时调用 */
    abstract unbind(...arg: unknown[]): void;

    removeAllNode() {
        const { firstComment, lastComment } = this;
        while (firstComment.nextSibling !== lastComment) {
            firstComment.nextSibling!.remove();
        }
    }

    removeMark() {
        this.firstComment.remove();
        this.lastComment.remove();
    }

    insertBefore(parent: Node, beforeNode: Node) {
        // tslint:disable-next-line:prefer-const
        let { firstComment, lastComment } = this;
        const endNode = lastComment.nextSibling;
        let node: Node = firstComment;
        while (firstComment !== endNode) {
            node = firstComment.nextSibling!;
            parent.insertBefore(firstComment, beforeNode);
            firstComment = node as any;
        }
    }

}
