import { LitElement, html, css } from 'lit';
import './c4-dialog';
import './c4-players-selector';
import './c4-board';
import { Game } from '../models/Game.mjs'

export class C4Main extends LitElement {
    #game

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

            .header-text {
                font-size: 1.8rem;
                font-weight: bold;
            }

            .header-text span {
                color:#DC143C;
            }

            .message {
                height: 2rem;
                padding: 0.5rem 0;
                width: 350px;
                overflow-y: hidden;
                font-size: 0.8rem;
                display: flex;
                align-items:center;
                justify-content: space-between;
            }

            .box-right {
                margin-bottom: 10px;
                float: left;
                width: 140px;
            }

            .box-left {
                position: relative;
                margin: 0px 10px 10px 0;
                float: left;
                overflow: hidden;
            }

            @media screen and (max-width: 600px) {
                #container {
                    margin: 0;
                    top: 50px;
                    left: 0;
                    padding: 0 5px;
                }

                .box-left {
                    float: none;
                }

                .box-right {
                    display: block;
                    float: none;
                }
            }
        `
    ];

    constructor(){
        super();
        this.play(1);
    }

    firstUpdated(){
        document.dispatchEvent(new CustomEvent('write-welcome', { 
            bubbles: true, composed: true
        }));
    }

    render() {
        return html`<div id="container">
            <h1 class="header-text">Conecta <span>4</span></h1>
            <div class="message"><c4-dialog></c4-dialog><div id="turn"></div></div>
            <div class="box-left">
                <c4-board
                    .board=${this.#game.getBoard()}
                ></c4-board>
            </div>
            <div class="box-right">
                <div id="options"><c4-players-selector></c4-players-selector></div>
            </div>
        </div>`;
    }

    play(numPlayers) {
        this.#game = new Game(numPlayers);
    }
}
customElements.define('c4-main', C4Main);
