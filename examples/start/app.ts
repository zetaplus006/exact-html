import { attr, html } from 'exact-html';
// tslint:disable
let name='test'
let text = 'innertext'

const render =()=> html`
    <div ${attr(name, text)}></div>
    <span sss>ssss${text}bbb${text}</span>
    <span sss>ssss${text}bbb${text}</span>
    <!-- ss${true&&text}ss -->
    <div ${attr('test', 'test2'  )} ${attr('test2', 'test3'  )}></div>
`;

const c=render()

const r = c.transformToHtmlTemplate();


r.init()
console.log(r);

// r.appendTo(document.body)
setTimeout(() => {
    name='lee'
    text='change'
    r.update(render().partParams);
}, 2000);
