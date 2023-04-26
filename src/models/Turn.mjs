import { UserPlayer } from '../models/UserPlayer.mjs'
import { RandomMachinePlayer } from '../models/RandomMachinePlayer.mjs'
import { MinimaxMachinePlayer } from '../models/MinimaxMachinePlayer.mjs'

export class Turn {
    static NUMBER_PLAYERS  = 2;

    #players
    #activePlayer

    constructor(board, numOfPlayers){
        this.#players = [];
        this.#activePlayer = 0;

        switch(numOfPlayers){
            case 0: 
                this.#players[0] = new RandomMachinePlayer(0, board);
                this.#players[1] = new MinimaxMachinePlayer(1, board);
                break;
            case 1:
                this.#players[0] = new UserPlayer(0, board);
                this.#players[1] = new MinimaxMachinePlayer(1, board);
                break;
            default:
                this.#players[0] = new UserPlayer(0, board);
                this.#players[1] = new UserPlayer(1, board);
        }
    }

    next() {
        this.#activePlayer = (this.#activePlayer + 1) % Turn.NUMBER_PLAYERS;
    }
    
    getToken() {
        return this.#players[this.#activePlayer].getColor();
    }

    getActivePlayer() {
        return this.#players[this.#activePlayer];
    }
}
