import { LitElement, html, css } from 'lit';
import { Color } from '../types/Color.mjs'

export class C4Player extends LitElement {

    #thinking

    static styles = [
        css`
            :host {
                display: box;
                width: 130px;
            }
            table {
                border-spacing: 0;
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
        `
    ];

    static get properties() {
        return {
            game: { type: Object },
            player: { type: Object },
        }
    }

    render() {
        return html`<div id="turn"><h2 class="turn-text">Turno</h2>
            <div class="turn">
                <table id="turn_board_player${Color.RED.getCode()}" class="turn_board">
                    <tbody><tr><td class="coin playerR-coin ${Color.RED.getCode()===this.getOppositeCode()?"turn_inactive":"turn_active"}"></td></tr></tbody>
                </table>
                <table id="turn_board_player${Color.YELLOW.getCode()}" class="turn_board">
                    <tbody><tr><td class="coin playerY-coin ${Color.YELLOW.getCode()===this.getOppositeCode()?"turn_inactive":"turn_active"}"></td></tr></tbody>
                </table>
            </div>
        </div>`;
    }

    playTurn() {
        //console.log('playTurn Player: ' + this.getPlayerCode());
        this.player = this.game.getTurn().getActivePlayer();
        this.player.accept(this);
    }

    getPlayerCode(){
        return  this.player.getColor().getCode();
    }

    getOppositeCode(){
        return  this.player.getColor().getOpposite().getCode();
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
            this.dispatchEvent(new CustomEvent('is-finished', {
                bubbles: true, composed: true
            }));
        }
    }

    visitUserPlayer() {
        console.log('visitUserPlayer Player: ' + this.player.getColor().getCode());
        this.dispatchEvent(new CustomEvent('write-select-column_not_welcome', {
            bubbles: true, composed: true
        }));
        //document.getElementById('game_board').classList.add('userPlayer');
        //this.#boardView.addEvent(this.getBoardColumn.bind(this));
    }

    visitMachinePlayer() {
        this.putToken("La Máquina esta pensado...");
    }

    visitMinimaxMachinePlayer() {
        this.putToken("La IA esta pensado...");
    }

    putToken(message){
        this.#thinking = html`<div id="loading">${message}</div>`;
        document.getElementsByClassName('box-left')[0].append(thinking);
        document.getElementById('loading').style.display = "block";
        setTimeout(function() {
            this.player.setColumn();
            this.player.putCoordinate();
            document.getElementById('game_board').classList.remove('userPlayer');
            //this.#callback();
            this.#thinking.remove();
        }.bind(this), 100);
    }

}
customElements.define('c4-player', C4Player);
