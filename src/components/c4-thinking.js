import { LitElement, html, css } from 'lit';

export class C4Thinking extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            .hidden{
                display: none;
            }

            .thinking {
                padding:0.5em 2.2em 0.5em 1em;
                border-radius:.3em;
                color:#fff;
                border:1px solid #fff;
                background:#DC143C;
                display:block; 
                position:fixed; 
                top:20%;
                left:40%;
                transform:translateX(-50%)  translateY(-50%);
                font: 300 0.8em/1.2 'Roboto', sans-serif;
                letter-spacing:1px;
                width: 200px;
            }

            .thinking:after {
                    content:'...';
                    width:0;
                    position:absolute;
                    overflow:hidden;
                    animation: dots-animation 1s infinite;
                }

            @keyframes dots-animation {
                0%   { width:0.0em; }
                50%  { width:1.2em; }
                100% { width:0.0em; }
            }

            @media screen and (max-width: 600px) {
                .thinking {
                    left:25%;
                }
            }

        `
    ];

    static properties = {
        message: { type: String },
    }

    constructor(){
        super();
        this.message = "";
        window.addEventListener('c4-thinking-show', (e) => this.show(e.detail.message));
        window.addEventListener('c4-thinking-hide', () => this.hide());
    }

    render() {
        return html`<div class="hidden">${this.message}</div>`;
    }

    show(message){
        this.message=message;
        this.shadowRoot.querySelector('div').className='thinking';
    }

    hide(){
        this.shadowRoot.querySelector('div').className='hidden';
    }

}
customElements.define('c4-thinking', C4Thinking);
