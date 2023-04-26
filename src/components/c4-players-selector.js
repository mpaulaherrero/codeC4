
import { LitElement, html, css } from 'lit';

export class C4PlayersSelector extends LitElement {
    #optionSelected

    static styles = [
        css`
            :host {
                display: block;
            }

            select {
                background: #fff;
                margin-bottom: 10px;
                border: 1px solid #808080;
                outline: none;
                width: 140px;
            }
        `
    ];

    constructor(){
        super();
        window.addEventListener('read-players', () => this.read());
    }

    render() {
        return html`<p><select id="num_players" autocomplete="off" >
            <option value="0">Máquina VS IA</option>
            <option value="1" selected >Jugador VS IA</option>
            <option value="2">Jugador VS Jugador</option>
            </select>
            <button @click=${this.setPlayers()}>Empezar Juego</button></p>`;
    }

    setOption(value){
        console.log('value ' + value)
        this.#optionSelected=parseInt(value);
    }

    setPlayers(){
        const numPlayers = this.#optionSelected;
        return function (){
            this.dispatchEvent(new CustomEvent('set-players', { 
                detail: {
                    numPlayers
                }
            }));   
        }
    }
    
    read(){
        return parseInt(this.shadowRoot.getElementById('num_players').value);
    }
}
customElements.define('c4-players-selector', C4PlayersSelector);
