import { LitElement, html, css } from 'lit';
import './c4-dialog';
import './c4-players-selector';
import './c4-board';
import './c4-player';
import './c4-game';
import './c4-thinking';
import { Game } from '../models/Game.mjs'

export class C4Main extends LitElement {
    #game

    DEFAULT_PLAYERS = 1;

    static styles = [
        css`
            :host {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
            }

            div, h1, span {
                margin: 0;
                padding: 0;
                border: 0;
            }

            h1 {
                line-height: 1;
            }

            #container {
                position: absolute;
                left: 50%;
                margin-top: 20px;
                margin-left: -255px;
                display: flex;
                flex-wrap: wrap;
            }

            .header-text {
                font-size: 1.8rem;
                font-weight: bold;
                width: 100%;
            }

            .header-text span {
                color:#DC143C;
            }

            .box-right {
                margin-bottom: 10px;
                float: left;
                width: 140px;
                padding-top: 57px;
            }

            @media screen and (max-width: 600px) {
                #container {
                    margin: 0;
                    top: 50px;
                    left: 0;
                    padding: 0 5px;
                    display: block;
                }

                .box-right {
                    display: block;
                    float: none;
                    padding-top: 0px;
                }
            }
        `
    ];

    constructor(){
        super();
        this.newGame(this.DEFAULT_PLAYERS);
    }

    render() {
        return html`<div id="container">
            <h1 class="header-text">Conecta <span>4</span></h1>
            <c4-game
                .game=${this.#game}
            ></c4-game>
            <div class="box-right">
                <div id="options">
                    <c4-players-selector
                        numPlayers=${this.DEFAULT_PLAYERS}
                        @c4-main-set-players=${this.setPlayers}
                    ></c4-players-selector>
                </div>
            </div>
        </div>`;
    }

    setPlayers(e){
        this.newGame(e.detail.numPlayers);
        this.shadowRoot.querySelector('c4-game').set(this.#game);
        document.dispatchEvent(new CustomEvent('c4-dialog-write-select-column', {
            bubbles: true, composed: true
        }));
    }

    newGame(numPlayers) {
        this.#game = new Game(numPlayers);
    }

}
customElements.define('c4-main', C4Main);
