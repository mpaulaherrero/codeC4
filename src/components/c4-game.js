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

    static properties= {
        game: { type: Object, reflect: true },
    }

    firstUpdated(){
        this.boardComponent = this.shadowRoot.querySelector('c4-board');
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
                            @c4-game-is-finished=${this.isFinished}
                        ></c4-player>
                    </div>
                    <div class="box-left">
                        <c4-board
                            .board=${this.game.getBoard()}
                        ></c4-board>
                    </div>`;
    }

    set(game){
        this.game=game;
        this.boardComponent.set(this.game.getBoard());
        this.playerComponent.set(this.game);
    }

    isFinished(){
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
            this.dialogComponent.writeWinner();
            this.playerComponent.setWinner();
            this.boardComponent.displayWinnerLine();
        } else {
            this.dialogComponent.writeTie();
            this.playerComponent.setTie();
        }
    }
}
customElements.define('c4-game', C4Game);
