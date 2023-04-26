import { Minimax } from "./Minimax.mjs";
//import { logger } from "../utils/logger.mjs";

export class MaxPlayer extends Minimax {
    
    constructor(color){
        super(color, Minimax.MIN_COST, color);
    }

    nextCost(maxCost, minCost, column){
        if (maxCost.getColumn() === undefined || minCost.getValue() > maxCost.getValue()) {
            maxCost.setValue(minCost.getValue());
            maxCost.setColumn(column);
            //logger.info(`PLAYER ${this.color.getCode()} - newCost: ${maxCost.getValue()}, newColumn: ${maxCost.getColumn()}`);
        }
    }
}