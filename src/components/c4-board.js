import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'

export class C4Board extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
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

    static properties = {
        board: { type: Object },
    }

    render() {
        console.log(this.board.getTokens().length);
        return html`<table  id="game_board" class="userPlayer" 
                            @click=${this.doUpdate}>
            <tbody>
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

    doUpdate(e){
        console.log(e.target.cellIndex);
    }
}

customElements.define('c4-board', C4Board);
