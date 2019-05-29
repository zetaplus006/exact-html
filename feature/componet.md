

``` typescript
import { Component, html , on , classMap } from 'excat-html'

class Text extends Component<{text:string,onClick:()=>void}> {

    render(){
        const { text , onClick } = this.props;
        return html`
            <p ${on('click',onClick)} ${classMap({'text':ture})}>${text}<p>
        `
    }
}
```