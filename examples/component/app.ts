import { App, child, Component, html ,on} from 'exact-html';

class Test extends Component<{ num: number }> {

    render() {
        return html`<div>${this.props.num}</div>`;
    }
}

class Counter extends Component<any> {

    num = 0;

    isShowChild = true;

    constructor(props: any) {
        super(props);
        setInterval(() => {
            this.num++;
            this.update();
        }, 1000);
        setTimeout(() => {
            this.isShowChild = false;
        }, 3000);
    }

    render() {
        return html`
            <div>
                ${this.num}
            </div>
            <div>
                ${this.isShowChild && child(Test, { num: this.num })
                    || html`<span>over</span>`}
            </div>
       `;
    }

}

new App({
    root: Counter,
    el: '#app'
});
