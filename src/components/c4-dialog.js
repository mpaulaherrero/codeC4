import { LitElement, html, css } from 'lit';

export class C4Dialog extends LitElement {
    #welcomeText = 'Si quieres jugar contra la IA seleciona una columna, si no, cambia la opción y empieza otro juego';

    static styles = [
        css`
            :host {
                display: block;
            }

            #dialog {
                width: 340px;
            }

        `
    ];

    static properties = {
        text: { type: String },
    }

    constructor(){
        super();
        window.addEventListener('write-text', (e) => this.write(e.detail.message));
        window.addEventListener('write-welcome', () => this.write(this.#welcomeText));
    }

    render() {
        return html`<p id="dialog" >${this.text}</p>`;
    }

    write(text){
        this.text = text;
    }
}
customElements.define('c4-dialog', C4Dialog);
