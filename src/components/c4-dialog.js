import { LitElement, html, css } from 'lit';

export class C4Dialog extends LitElement {
    #welcomeText = 'Si quieres jugar contra la IA seleciona una columna, si no, cambia la opción y empieza otro juego';
    #selectColumnText = `Selecciona una columna`;
    #fullColumnText = `La columna esta llena, intente con otra`;

    static styles = [
        css`
            :host {
                display: block;
                width: 340px;
            }
            p {
                margin: 0;
                padding: 0;
            }
        `
    ];

    static properties = {
        text: { type: String },
    }

    constructor(){
        super();
        window.addEventListener('write-text', (e) => this.write(e.detail.message));
        //window.addEventListener('write-welcome', () => this.write(this.#welcomeText));
        window.addEventListener('write-select-column', () => this.write(this.#selectColumnText));
        window.addEventListener('write-select-column_not_welcome', () => this.writeIfNotWelcome(this.#selectColumnText));
        window.addEventListener('write-full-column', () => this.write(this.#fullColumnText));
    }

    render() {
        return html`<p>${this.text}</p>`;
    }

    writeWelcome(){
        this.write(this.#welcomeText);
    }

    write(text){
        this.text = text;
    }

    writeIfNotWelcome(text){
        if(this.text !== this.#welcomeText){
            this.write(text);
        }
    }
}
customElements.define('c4-dialog', C4Dialog);
