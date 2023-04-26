export class Coordinate {
    static MIN_COLUMNS = 1;
    static MAX_COLUMNS = 7;
    static MAX_ROWS = 6;
    
    #row
    #column

    constructor(row=undefined, column=undefined) {
        this.#row = row;
        this.#column = column;
    }

    shifted(coordinate) {
        return new Coordinate(this.#row + coordinate.#row,
                              this.#column + coordinate.#column);
    }
    
    toString() {
        return `(${this.#row},${this.#column})`;
    }
    
    isValid(){
        return 0 <= this.#row && this.#row < Coordinate.MAX_ROWS && 0 <= this.#column && this.#column < Coordinate.MAX_COLUMNS
    }
    
    getOpposite() {
        return new Coordinate(this.#row * -1, this.#column * -1);
    }

    getRow(){
        return this.#row;
    }

    getColumn(){
        return this.#column;
    }

    setRow(value){
        this.#row=value;
    }

    setColumn(value){
        this.#column=value;
    }

    clone(){
        return new Coordinate(this.#row, this.#column);
    }
}