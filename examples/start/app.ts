import { attr, classes, click, html, on, show, style } from 'exact-html';
// tslint:disable
let name='test'
let text:any = 'text';
let isActive=false
let styleObj:any={backgroundColor:'#3cbaff',fontSize:'16px'}
let isShow=false

let changeTpl=true

const render =()=> html`
    <div ${on('click',(e: any)=>alert(JSON.stringify(e)))}>mouseenter</div>
    <button ${click(e=>alert('click'))} ${attr('test', 'test2'  )} ${attr('test2', 'test3'  )}>click</button>
    <div ${attr(name, text)}></div>
    <span sss  ${style(styleObj)}>ssss${text}bbb${text}</span>
    <div ${classes({active:isActive})}>test classes</div>
    <div ${show(isShow)}>test show</div>
    <span sss>ssss  ${text} bbb  ${text}</span>
    <div>
        ${
            changeTpl? html`<div ${style(styleObj)}>template childs ${text}
            </div>`
            :
            html`<div>change template</div>`
        }
    </div>
    <!-- ss${true&&text}ss -->
`;
console.time('1')
const c=render()
console.timeEnd('1')
console.time('2')
const r = c.transformToHtmlTemplate();
console.timeEnd('2')

console.time('3')
r.init()
console.timeEnd('3')
console.log(r);

r.appendTo(document.body)
setTimeout(() => {
    name='lee'
    text='change'
    styleObj=[Object.assign(styleObj,{color:'#fff',backgroundColor:'red'}),{height:'40px',display:'block'}]
    isActive=true;
    isShow=true;
    text="text_change"
    changeTpl=false;
    console.time('update')
    r.update(render().partParams);
    console.timeEnd('update')
}, 2000);
