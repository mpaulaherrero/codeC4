
import { LitElement, html, css } from 'lit';

export class C4PlayersSelector extends LitElement {

    static styles = [
        css`
            :host {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
                font: inherit;
                font-size: 100%;
            }
            p {
                margin: 0;
                padding: 0;
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

    static properties = {
        numPlayers: { type: Number },
    }

    render() {
        return html`<p><select id="num_players" autocomplete="off" >
            <option value="0" ?selected=${this.numPlayers===0}>Máquina VS IA</option>
            <option value="1" ?selected=${this.numPlayers===1}>Jugador VS IA</option>
            <option value="2" ?selected=${this.numPlayers===2}>Jugador VS Jugador</option>
            </select>
            <button @click=${this.setNumPlayers}>Empezar Juego</button></p>`;
    }

    setNumPlayers(){
        this.numPlayers = parseInt(this.shadowRoot.getElementById('num_players').value);
        this.dispatchEvent(new CustomEvent('c4-main-set-players', {
            bubbles: true, composed: true,
            detail: { numPlayers: this.numPlayers }
        }));
    }
}
customElements.define('c4-players-selector', C4PlayersSelector);
