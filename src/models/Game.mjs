import { Board } from '../models/Board.mjs'
import { Turn } from '../models/Turn.mjs'

export class Game {
    #board
    #turn

    constructor(numPlayers){
        this.#board = new Board();
        this.#turn = new Turn(this.#board,numPlayers);
    }

    getBoard(){
        return  this.#board;
    }

    getTurn(){
        return  this.#turn;
    }

    isFinished() {
        return this.#board.isFinished()
    }

    isWinner() {
        return this.#board.isLastTokenInLine()
    }

    getWinnerToken() {
        return this.#turn.getToken();
    }

    nextTurn() {
        this.#turn.next();
    }
}    
