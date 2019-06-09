import { App, Component, html } from 'exact-html';

class Counter extends Component<any> {

    num = 0;

    constructor(props: any) {
        super(props);
        setInterval(() => {
            this.num++;
            this.update();
        }, 1000);
    }

    render() {
        return html`
            <div>
                ${this.num}
            </div>
            <div>
                ${this.num}
            </div>
            <div>
                ${this.num}
            </div>
       `;
    }

}

new App({
    root: Counter,
    el: '#app'
});
