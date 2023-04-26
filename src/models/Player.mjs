import { Color } from '../types/Color.mjs'

export class Player{
    #color
    #board

    constructor(indexColor, board){
        this.#color = Color.get(indexColor);
        this.#board = board;
    }
    
    getColor() {
        return this.#color;
    }

    getBoard(){
        return this.#board;
    }

    isCoordinateColumnEmpty() {
        return this.#board.isLastCoordinateColumnEmpty();
    }
    
    getCoordinate() {
        return this.#board.getLastCoordinate();
    }
    
    putCoordinate() {
        this.#board.putLastCoordinate(this.getColor());
    }
}

