import { attr, click, html, on } from 'exact-html';
// tslint:disable
let name='test'
let text = 'innertext'



const render =()=> html`
    <div ${on('mouseenter',(e: any)=>alert(JSON.stringify(e)))}>mouseenter</div>
    <button ${click(e=>alert('click'))} ${attr('test', 'test2'  )} ${attr('test2', 'test3'  )}>click</button>

    <div ${attr(name, text)}></div>
    <span sss>ssss${text}bbb${text}</span>
    <span sss>ssss${text}bbb${text}</span>
    <!-- ss${true&&text}ss -->
`;

const c=render()

const r = c.transformToHtmlTemplate();


r.init()
console.log(r);

r.appendTo(document.body)
setTimeout(() => {
    name='lee'
    text='change'
    r.update(render().partParams);
}, 2000);
