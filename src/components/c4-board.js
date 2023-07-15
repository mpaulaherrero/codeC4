import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'
import { Line } from '../models/Line.mjs';
export class C4Board extends LitElement {

    GAME_BOARD_ID = "game_board";

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

            table, tbody, tr, td {
                margin: 0;
                padding: 0;
                border: 0;
            }

            #game_board{
                overflow: hidden;
                border-collapse:collapse;
            }

            #game_board td {
                position: relative;
                width: 50px;
                height: 50px;
                cursor: pointer;
                border-radius: 50%;
                vertical-align: top;
            }

            #game_board td {
                border: 1px dashed #808080;
            }
            
            .userPlayer td:hover::after {
                background-color: #F4F4F4;
                content: '';
                height: 10000px;
                left: 0;
                position: absolute;
                top: -5000px;
                width: 100%;
                z-index: -1;
            }

            #coin {
                position: absolute;
                display: none;
                left: 0px;
                top: 0px;
                width: 51px;
                height: 51px;
                border-radius: 50%;
            }

            .finished td:hover::after{
                background-color: transparent !important;
            }

            #game_board .coin {
                cursor: default;
            }

            #game_board tr {
                width: 100%;
                height: 100%;
            }

            .playerR-coin {
                border-radius: 50%;
                background: #333;
            }

            .playerY-coin {
                border-radius: 50%;
                background: #DC143C;
            }

            #game_board .win {
                border-radius: 50%;
                animation: animationFrames 1s infinite;
                -webkit-animation: animationFrames 1s infinite;
                -moz-animation: animationFrames 1s infinite;
                -o-animation: animationFrames 1s infinite;
                -ms-animation: animationFrames 1s infinite;
            }

            @keyframes animationFrames{
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-moz-keyframes animationFrames{
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-webkit-keyframes animationFrames {
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-o-keyframes animationFrames {
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }

            @-ms-keyframes animationFrames {
                50% {
                    opacity:0.6;
                }
                100% {
                    opacity:1;
                }
            }
        `
    ];

    static get properties() {
        return {
            board: { type: Object },
            allowSelectColumn: {type: Boolean, reflect: true },
        };
    }

    constructor(){
        super();
        this.allowSelectColumn=false;
        window.addEventListener('c4-board-allow-select-column', () => this.doSelectColumn());
        window.addEventListener('c4-board-not-allow-select-column', () => this.doNotSelectColumn());
        window.addEventListener('c4-board-draw', () => this.requestUpdate());
    }

    render() {
        return html`<table  id="${this.GAME_BOARD_ID}" class="${this.allowSelectColumn?"userPlayer":""}">
            <tbody @click=${this.allowSelectColumn?this.doClickCell:null}>
                ${this.board.getTokens().map( row => html`
                    <tr>
                        ${row.map( token => html`
                            <td class="${token===Color.NULL?'empty':'coin player' + token.getCode() + '-coin'}"></td>
                        `)}
                    </tr>
                `)}
            </tbody>
        </table>`;
    }

    doClickCell(e){
        this.dispatchEvent(new CustomEvent('c4-player-set-column', {
            bubbles: true, composed: true,
            detail: { column: e.target.cellIndex }
        }));
    }

    set(board){
        this.board = board;
        this.allowSelectColumn=false;
    }

    doNotSelectColumn(){
        this.allowSelectColumn=false;
    }

    doSelectColumn(){
        this.allowSelectColumn=true;
    }

    displayWinnerLine(){
        this.shadowRoot.getElementById(this.GAME_BOARD_ID).className = "finished";
        //inconsistencia con ultimo token puesto, se muestra pero no esta en el html el estilo
        setTimeout(function() {
            const winnerLine = this.board.getWinnerLine().getCoordinates();
            const rows = this.shadowRoot.getElementById(this.GAME_BOARD_ID).rows;
            for (let i = 0; i < Line.LENGTH; i++) {
                rows[winnerLine[i].getRow()].cells[winnerLine[i].getColumn()].classList.add("win");
            }
        }.bind(this), 10);
    }
}

customElements.define('c4-board', C4Board);
