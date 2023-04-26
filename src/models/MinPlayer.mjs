import { Minimax } from "./Minimax.mjs";
//import { logger } from "../utils/logger.mjs";

export class MinPlayer extends Minimax {
    
    constructor(color){
        super(color, Minimax.MAX_COST, color.getOpposite());
    }

    nextCost(minCost, maxCost, column){
        if (minCost.getColumn() === undefined || maxCost.getValue() < minCost.getValue()) {
            minCost.setValue(maxCost.getValue());
            minCost.setColumn(column);
            //logger.info(`PLAYER ${this.color.getCode()} - newCost: ${minCost.getValue()}, newColumn: ${maxCost.getColumn()}`);
        }
    }
}    