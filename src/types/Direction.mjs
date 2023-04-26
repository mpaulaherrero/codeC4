import { Coordinate } from './Coordinate.mjs'

export class Direction{
    static NORTH = new Direction('NORTH', 1, 0);
    static NORTH_EAST = new Direction('NORTH_EAST', 1, 1);
    static EAST = new Direction('EAST', 0, 1);
    static SOUTH_EAST = new Direction('SOUTH_EAST', -1, 1);
    
    #name
    #coordinate

    constructor(name, row, column) {
        this.#name = name;
        this.#coordinate = new Coordinate(row, column);
    }

    static getValues(){
        return [ Direction.NORTH, Direction.NORTH_EAST, Direction.EAST, Direction.SOUTH_EAST];
    }

    toString() {
        return `(${this.#name} -> direction: ${this.#coordinate.toString()}, oposite direction: ${this.#coordinate.getOpposite().toString()})`;
    }
    
    getOppositeCoordinate() {
        return this.#coordinate.getOpposite();
    }

    getCoordinate(){
        return this.#coordinate;
    }

    clone(){
        return new Direction(this.#name, this.#coordinate.getRow(), this.#coordinate.getColumn());
    }
}
