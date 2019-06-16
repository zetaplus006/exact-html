import { App, child, Component, html, map } from 'exact-html';

class Test extends Component<{ num: number }> {

    shouldUpdate() {
        return true;
    }

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
            this.list=[
                {
                    num: 12
                },
                {
                    num: 1
                },
                {
                    num: 5
                },
                {
                    num: 2
                },
                {
                    num: 121
                },
                {
                    num: 11
                },
                {
                    num: 51
                },
                {
                    num: 21
                }
            ]
        }, 1000);
        console.log(this);
    }

    list = [
        {
            num: 1
        },
        {
            num: 2
        }
    ];

    render() {
            return html`
                <div>
                    ${this.num}
                </div>
                <div>
                    ${this.isShowChild && child(Test, { num: this.num }) || html`<span>over</span>`}
                </div>
                <div>
                    ${map(this.list,(item, index)=> item.num,( item )=>{
                        return child( Test, {num:item.num} )
                    })}
                </div>
           `;
    }

}

new App({
    root: Counter,
    el: '#app'
});
