import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'

export class C4Player extends LitElement {

    MACHINE_PLAYER_MESSAGE = "La Máquina esta pensado";
    IA_PLAYER_MESSAGE = "La IA esta pensado";

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

    static properties = {
        game: { type: Object },
        player: { type: Object },
    }

    constructor(){
        super();
        window.addEventListener('c4-player-set-column', (e) => this.setColumn(e.detail.column));
    }

    render() {
        return html`<div id="turn">
            <h2 class="turn-text">Turno</h2>
            <div class="turn">
                ${this.getPlayerColorTable(
                    `turn_board_player${Color.RED.getCode()}`,
                    Color.RED.getCode(),
                    Color.RED.getCode()===this.getOppositeCode()?"turn_inactive":"turn_active"
                )}
                ${this.getPlayerColorTable(
                    `turn_board_player${Color.YELLOW.getCode()}`,
                    Color.YELLOW.getCode(),
                    Color.YELLOW.getCode()===this.getOppositeCode()?"turn_inactive":"turn_active"
                )}
            </div>
        </div>`;
    }

    getPlayerColorTable(id, classColor, classActive){
        return html`<table id="${id}" class="turn_board">
                        <tbody>
                            <tr><td class="coin player${classColor}-coin ${classActive}"></td></tr>
                        </tbody>
                    </table>`;
    }

    setWinner(){
        this.shadowRoot.querySelector("h2").classList.add("hidden");
        this.shadowRoot.getElementById(`turn_board_player${this.getOppositeCode()}`).classList.add("hidden");
    }

    setTie(){
        this.setWinner();
        this.shadowRoot.getElementById(`turn_board_player${this.getPlayerCode()}`).classList.add("hidden");
    }

    set(game){
        this.game = game;
        this.playTurn();
        this.shadowRoot.querySelector("h2").classList.remove("hidden");
        this.shadowRoot.getElementById(`turn_board_player${this.getOppositeCode()}`).classList.remove("hidden");
        this.shadowRoot.getElementById(`turn_board_player${this.getPlayerCode()}`).classList.remove("hidden");
    }

    getPlayerCode(){
        return  this.game.getTurn().getActivePlayer().getColor().getCode();
    }

    getOppositeCode(){
        return  this.game.getTurn().getActivePlayer().getColor().getOpposite().getCode();
    }

    playTurn() {
        this.player = this.game.getTurn().getActivePlayer()
        this.player.accept(this);
    }

    setColumn(value){
        this.player.getCoordinate().setColumn(value);
        if (!this.player.isCoordinateColumnEmpty()) {
            this.#dispatchCustomEvent('c4-dialog-write-full-column');
        } else {
            this.player.putCoordinate();
            this.#dispatchCustomEvent('c4-dialog-clean');
            this.#dispatchCustomEvent('c4-board-not-allow-select-column');
            this.#dispatchCustomEvent('c4-game-is-finished');
        }
    }

    visitUserPlayer() {
        this.#dispatchCustomEvent('c4-dialog-write-select-column-if-not-welcome');
        this.#dispatchCustomEvent('c4-board-allow-select-column');
    }

    visitMachinePlayer() {
        this.#putToken(this.MACHINE_PLAYER_MESSAGE);
    }

    visitMinimaxMachinePlayer() {
        this.#putToken(this.IA_PLAYER_MESSAGE);
    }

    #putToken(message){
        this.dispatchEvent(new CustomEvent('c4-thinking-show', {
            bubbles: true, composed: true,
            detail: { message }
        }));
        this.player.setColumn();
        setTimeout(function() {
            this.#dispatchCustomEvent('c4-thinking-hide');
            this.player.putCoordinate();
            this.#dispatchCustomEvent('c4-board-draw');
            this.#dispatchCustomEvent('c4-game-is-finished');
        }.bind(this), 100);
    }

    #dispatchCustomEvent(name){
        this.dispatchEvent(new CustomEvent(name, {
            bubbles: true, composed: true
        }));
    }

}
customElements.define('c4-player', C4Player);
