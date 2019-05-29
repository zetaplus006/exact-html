import { attr, html } from 'exact-html';
// tslint:disable

const text = 'innertext'

const t = html`
    <div ${attr('test', 'test1' )}></div>
    <span sss>ssss${text}bbb${text}</span>
    <div ${attr('test', 'test2')} ${attr('test2', 'test3')}></div>
`;
console.log(t);

const r = t.transformToHtmlTemplate();
console.log(r);
