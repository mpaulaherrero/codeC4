import { LitElement, html, css } from 'lit';

export class C4Game extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
            }

            .header-text {
                font-size: 1.8rem;
                font-weight: bold;
            }

            .header-text span {
                color:#DC143C;
            }

            .box-right {
                margin-bottom: 10px;
                float: left;
                width: 140px;
            }

            .message {
                height: 2rem;
                padding: 0.5rem 0;
                width: 370px;
                overflow-y: hidden;
                font-size: 0.8rem;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
            }

            .box-left {
                position: relative;
                margin: 0px 10px 10px 0;
                float: left;
                overflow: hidden;
            }

            @media screen and (max-width: 600px) {
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

    static get properties() {
        return {
            game: { type: Object },
            numPlayers: { type: Number },
        }
    }

    firstUpdated(){
        this.boardComponent = this.shadowRoot.querySelector('c4-board');
        this.drawBoard();
        this.playerComponent = this.shadowRoot.querySelector('c4-player');
        this.playerComponent.playTurn();
        this.dialogComponent = this.shadowRoot.querySelector('c4-dialog');
        this.dialogComponent.writeWelcome();
    }

    render() {
        return html`<div class="message">
                        <c4-dialog></c4-dialog>
                        <c4-player
                            .game=${this.game}
                            @is-finished=${this.isFinished}
                        ></c4-player>
                    </div>
                    <div class="box-left">
                        <c4-board
                            .board=${this.game.getBoard()}
                            @set-cell-index=${this.setPlayerColumn}
                        ></c4-board>
                    </div>
                    <div class="box-right">
                    <div id="options">
                        <c4-players-selector
                            numPlayers=${this.numPlayers}
                        ></c4-players-selector>
                    </div>
                </div>`;
    }

    setPlayerColumn(e){
        this.playerComponent.setColumn(e.detail.cellIndex);
    }

    drawBoard(){
        this.boardComponent.draw();
    }

    isFinished(){
        console.log('is-finished');
        this.drawBoard();
        if (!this.game.isFinished()) {
            this.game.nextTurn();
            console.log('isFinished Player: ' + this.game.getTurn().getActivePlayer().getColor().getCode());
            this.playerComponent.playTurn();
       } else {
           //this.#writeFinish();
           console.log('writeFinish');
       }
    }

    // #writeFinish() {
    //     if(this.game.isWinner()){
    //         const winnerTable = document.getElementsByClassName('turn_active')[0];
    //         winnerTable.id="winnerDisplay";
    //         winnerTable.style.width="24px";
    //         winnerTable.style.display="inline-block";
    //         winnerTable.style.marginLeft="5px";
    //         DialogView.writeWinner(`Victoria para`, winnerTable);
    //         document.getElementById('turn').innerHTML="";
    //         this.#boardView.displayWinnerLine();
    //     } else {
    //         DialogView.write(`¡Empate!`);
    //         document.getElementById('turn').innerHTML="";
    //     }
    // }
}
customElements.define('c4-game', C4Game);
