import { LitElement, html, css } from 'lit';

export class C4Game extends LitElement {
    static styles = [
        css`
            :host {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
            }

            div {
                margin: 0;
                padding: 0;
                border: 0;
            }

            .message {
                height: 2.5rem;
                padding: 0.5rem 0;
                width: 357px;
                overflow-y: hidden;
                font-size: 0.8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
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
            }
        `
    ];

    static get properties() {
        return {
            game: { type: Object },
        }
    }

    firstUpdated(){
        this.boardComponent = this.shadowRoot.querySelector('c4-board');
        this.drawBoard();
        this.playerComponent = this.shadowRoot.querySelector('c4-player');
        this.playerComponent.setPlayer();
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
            this.playerComponent.playTurn();
       } else {
           this.#writeFinish();
       }
    }

    #writeFinish() {
        console.log('writeFinish');
        if(this.game.isWinner()){
            this.dialogComponent.writeWinner("gano");
    //         DialogView.writeWinner(`Victoria para`, winnerTable);
    //         const winnerTable = document.getElementsByClassName('turn_active')[0];
    //         winnerTable.id="winnerDisplay";
    //         winnerTable.style.width="24px";
    //         winnerTable.style.display="inline-block";
    //         winnerTable.style.marginLeft="5px";
    //         document.getElementById('turn').innerHTML="";
    //         this.#boardView.displayWinnerLine();
        } else {
    //         DialogView.write(`¡Empate!`);
    //         document.getElementById('turn').innerHTML="";
        }
    }
}
customElements.define('c4-game', C4Game);
