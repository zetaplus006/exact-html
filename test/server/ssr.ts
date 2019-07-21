import { App, attr, child, Component, html } from '../../src/index';

class Test2 extends Component<any> {

    text = 'child';

    render () {
        return html`
        <div>
            ${this.text}
        </div>`;
    }
}

class Test extends Component<any> {

    text = 'hello';

    list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 4, 5];

    render () {
        return html`
        <div ${ attr('vaule', 'ssss')}>
            ${this.text}
            ${html`
            <ul>
                <li>${this.text}</li>
            </ul>
            `}
            ${html`
            <ul class="current">
                <li>static</li>
            </ul>
            `}
            ${html`
            ${'@@@@'}
            `}
        </div>`;
    }
}

const app = new App({
    root: Test
});

// tslint:disable:no-console
console.time();
const str = app.renderToString();
console.timeEnd();

console.log('---------- output ----------');
console.log(str);
