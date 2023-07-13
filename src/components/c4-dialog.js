import { LitElement, html, css } from 'lit';

export class C4Dialog extends LitElement {
    WELCOME_TEXT = 'Si quieres jugar contra la IA seleciona una columna, si no, cambia la opción y empieza otro juego';
    SELECT_COLUMN_TEXT = `Selecciona una columna`;
    FULL_COLUMN_TEXT = `La columna esta llena, intente con otra`;
    WINNER_TEXT = `Victoria para`;

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
        window.addEventListener('write-select-column', () => this.write(this.SELECT_COLUMN_TEXT));
        window.addEventListener('write-select-column_not_welcome', () => this.writeIfNotWelcome(this.SELECT_COLUMN_TEXT));
        window.addEventListener('write-full-column', () => this.write(this.FULL_COLUMN_TEXT));
    }

    render() {
        return html`<p>${this.text}</p>`;
    }

    writeWelcome(){
        this.write(this.WELCOME_TEXT);
    }

    write(text){
        this.text = text;
    }

    writeIfNotWelcome(text){
        if(this.text !== this.WELCOME_TEXT){
            this.write(text);
        }
    }

    writeWinner(element){
        this.write(this.WINNER_TEXT + " " + element );
        //const dialogElement = document.getElementById('dialog');
        //dialogElement.innerHTML=text;
        //dialogElement.append(element);
        //dialogElement.parentNode.insertBefore(element,dialogElement.nextSibling);
    }
}
customElements.define('c4-dialog', C4Dialog);
