import { LitElement, html, css } from 'lit';
import './c4-dialog';
import './c4-players-selector';
import './c4-board';
import './c4-player';
import './c4-game';
import { Game } from '../models/Game.mjs'

export class C4Main extends LitElement {
    #game

    #ONE_PLAYER = 1;

    static styles = [
        css`
            :host {
                display: block;
            }

            #container {
                position: absolute;
                left: 50%;
                margin-top: 20px;
                margin-left: -255px;
            }

            @media screen and (max-width: 600px) {
                #container {
                    margin: 0;
                    top: 50px;
                    left: 0;
                    padding: 0 5px;
                }
            }
        `
    ];

    constructor(){
        super();
        this.newGame(this.#ONE_PLAYER);
    }

    render() {
        return html`<div id="container">
            <h1 class="header-text">Conecta <span>4</span></h1>
            <c4-game
                .game=${this.#game}
                numPlayers=${this.#ONE_PLAYER}
                @set-players=${this.setPlayers}
            ></c4-game>
        </div>`;
    }

    setPlayers(e){
        this.newGame(e.detail.numPlayers);
        document.dispatchEvent(new CustomEvent('write-select-column', {
            bubbles: true, composed: true
        }));
    }

    newGame(numPlayers) {
        this.#game = new Game(numPlayers);
    }

}
customElements.define('c4-main', C4Main);
