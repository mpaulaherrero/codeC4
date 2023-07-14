import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'

export class C4Player extends LitElement {

    #thinking

    static styles = [
        css`
            :host {
                display: box;
                width: 130px;
                margin: 0;
                padding: 0;
                border: 0;
            }

            div, h2, table, tbody, tr, td {
                margin: 0;
                padding: 0;
                border: 0;
            }

            table {
                border-spacing: 0;
            }

            h2 {
                font: inherit;
            }

            #turn {
                display: flex;
                justify-content: space-between;
                padding-left: 10px;
                height: 20px;
                align-items: center;
            }
            .turn-text {
                font-size: 0.9rem;
            }
            .turn {
                display: flex;
                justify-content: space-between;
                width: 50%;
            }
            .turn_board {
                overflow: hidden;
                border-collapse: collapse;
            }
            .turn_active {
                opacity: 1;
            }
            .turn_inactive {
                opacity: 0.2;
            }
            .turn_board td {
                position: relative;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                vertical-align: top;
            }
            .playerR-coin {
                background: #333;
            }
            .playerY-coin {
                background: #DC143C;
            }
            .hidden{
                display: none;
            }
            #winnerDisplay {
                width: 24px;
                display: inline-block;
                margin-left: 5px;
            }
        `
    ];

    static get properties() {
        return {
            game: { type: Object },
            player: { type: Object },
        }
    }

    render() {
        return html`<div id="turn">
            <h2 class="turn-text">Turno</h2>
            <div class="turn">
                ${this.getPlayerColor(
                    `turn_board_player${Color.RED.getCode()}`,
                    Color.RED.getCode(),
                    Color.RED.getCode()===this.getOppositeCode()?"turn_inactive":"turn_active"
                )}
                ${this.getPlayerColor(
                    `turn_board_player${Color.YELLOW.getCode()}`,
                    Color.YELLOW.getCode(),
                    Color.YELLOW.getCode()===this.getOppositeCode()?"turn_inactive":"turn_active"
                )}
            </div>
        </div>`;
    }

    getPlayerColor(id, classColor, classActive){
        return html`<table id="${id}" class="turn_board">
                        <tbody><tr><td class="coin player${classColor}-coin ${classActive}"></td></tr></tbody>
                </table>`;
    }

    setWinner(){
        this.shadowRoot.querySelector("h2").classList.add("hidden");
        this.shadowRoot.getElementById(`turn_board_player${this.getOppositeCode()}`).classList.add("hidden");
    }

    setTie(){
        this.shadowRoot.querySelector("h2").classList.add("hidden");
        this.shadowRoot.getElementById(`turn_board_player${this.getOppositeCode()}`).classList.add("hidden");
        this.shadowRoot.getElementById(`turn_board_player${this.getPlayerCode()}`).classList.add("hidden");
    }

    getPlayerCode(){
        return  this.player.getColor().getCode();
    }

    getOppositeCode(){
        return  this.player.getColor().getOpposite().getCode();
    }

    setPlayer(){
        this.player = this.game.getTurn().getActivePlayer();
    }

    playTurn() {
        this.setPlayer()
        this.player.accept(this);
    }

    setColumn(value){
        this.player.getCoordinate().setColumn(value);
        if (!this.player.isCoordinateColumnEmpty()) {
            this.dispatchEvent(new CustomEvent('write-full-column', {
                bubbles: true, composed: true
            }));
        } else {
            this.player.putCoordinate();
            this.dispatchEvent(new CustomEvent('write-text', {
                bubbles: true, composed: true,
                detail: { message: ``}
            }));
            this.endSetColumn();
        }
    }

    endSetColumn(){
        this.dispatchEvent(new CustomEvent('board_remove_event', {
            bubbles: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent('is-finished', {
            bubbles: true, composed: true
        }));
    }

    visitUserPlayer() {
        console.log('visitUserPlayer Player: ' + this.player.getColor().getCode());
        this.dispatchEvent(new CustomEvent('write-select-column_not_welcome', {
            bubbles: true, composed: true
        }));
        this.dispatchEvent(new CustomEvent('board_add_event', {
            bubbles: true, composed: true
        }));
    }

    visitMachinePlayer() {
        this.putToken("La Máquina esta pensado...");
    }

    visitMinimaxMachinePlayer() {
        this.putToken("La IA esta pensado...");
    }

    putToken(message){
        console.log("putToken message: " + message);
        // this.#thinking = html`<div id="loading">${message}</div>`;
        // document.getElementsByClassName('box-left')[0].append(thinking);
        // document.getElementById('loading').style.display = "block";
        // setTimeout(function() {
        //     this.player.setColumn();
        //     this.player.putCoordinate();
        //     this.endSetColumn();
        //     this.#thinking.remove();
        // }.bind(this), 100);
    }

}
customElements.define('c4-player', C4Player);
