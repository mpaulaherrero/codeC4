import { assert} from "../utils/assert.mjs";
import { Coordinate } from "../types/Coordinate.mjs";
import { Direction } from "../types/Direction.mjs";
import { Line } from './Line.mjs'
import { MinimaxCost } from "./MinimaxCost.mjs";
//import { logger } from "../utils/logger.mjs";


export class Minimax {

    static #MAX_STEPS = 4;
    static #MAX_LIMIT = 1000; 
    static MAX_COST = 1;
    static MIN_COST = -1;

    color
    #lowerLimit
    #opposite
    #bestScoreColor
    
    constructor(color, lowerLimit, bestScoreColor){
        this.color = color;
        this.#lowerLimit = lowerLimit;
        this.#bestScoreColor = bestScoreColor;
        //logger.info(`PLAYER ${this.color.getCode()} creado con  bestScoreColor: ${this.#bestScoreColor.getCode()}`);
    }

    setOpposite(opposite){
        this.#opposite = opposite;
    }

    getCost(steps, board) {
        assert(this.#opposite!==undefined,"Hay que definir el jugador opuesto");

        if (this.#isEnd(steps, board)) return this.#getEndCost(board, this.#lowerLimit);
        
        let cost = new MinimaxCost(this.#lowerLimit);
        let emptyColumns = board.getEmptyColumns();
        for (let column of emptyColumns) {
            let newBoard = board.clone();
            newBoard.putCoordinate(column, this.color);
            //logger.info(`PLAYER ${this.color.getCode()} - STEP: ${steps}, column: ${column}, cost: ${cost.getValue()}, costColumn: ${cost.getColumn()}`);
            //logger.info(newBoard.toString());
            let nextMoveCost = this.#opposite.getCost(steps + 1, newBoard);
            //logger.info(`PLAYER ${this.color.getCode()} - STEP: ${steps}, cost: ${cost.getValue()}, costColumn: ${cost.getColumn()}, nextMoveCost: ${nextMoveCost.getValue()}, nextMoveColumn: ${nextMoveCost.getColumn()}`);
            this.nextCost(cost, nextMoveCost, column);
        }
        return cost;
    }

    nextCost(cost, nextMoveCost){}
    
    #isEnd(steps, board) {
        return steps ===  Minimax.#MAX_STEPS || board.isFinished();
    }

    #getEndCost(board, costValue){
        let cost = new MinimaxCost(costValue);
        if(!board.isLastTokenInLine()){
            cost.setValue(this.#getBestScore(board) / Minimax.#MAX_LIMIT);
        }
        //logger.info(`PLAYER ${this.color.getCode()} END - cost: ${cost.getValue()}`);
        return cost; 
    }

    #getBestScore(board){
        let point = 0;
        for (let row = 0; row < board.getMaxRows() - 3; row++) {
            for (let column = 0; column < board.getMaxColumns(); column++) {
                point += this.#getInLinePoint(board, new Line(new Coordinate(row, column), Direction.NORTH));
            }    
        }
        for (let row = 0; row < board.getMaxRows(); row++) {
            for (let column = 0; column < board.getMaxColumns() - 3; column++) { 
                point += this.#getInLinePoint(board, new Line(new Coordinate(row, column), Direction.EAST)); 
            } 
        }
        for (let row = 0; row < board.getMaxRows() - 3; row++) {
            for (let column = 0; column < board.getMaxColumns() - 3; column++) {
                point += this.#getInLinePoint(board, new Line(new Coordinate(row, column), Direction.NORTH_EAST));
            }            
        }
        for (let row = 3; row < board.getMaxRows(); row++) {
            for (let column = 0; column <= board.getMaxColumns() - 4; column++) {
                point += this.#getInLinePoint(board, new Line(new Coordinate(row, column), Direction.SOUTH_EAST));
            }
        }
        //logger.info(`PLAYER ${this.color.getCode()} BestScore Total points: ${point}`);
        return point;
    }
    
    #getInLinePoint(board, line) {
        let point = 0;
        let coordinates = line.getCoordinates();   
        for(let i = 0; i < coordinates.length; i++) {
            if (board.getToken(coordinates[i].getRow(), coordinates[i].getColumn()) === this.#bestScoreColor) {
                point += 1;
            }
        }
        //logger.info(`PLAYER ${this.color.getCode()} isInLinePoint: (${line.toString()}), point: ${point}`);
        return point;
    }
}