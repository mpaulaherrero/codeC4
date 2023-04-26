import { MachinePlayer } from "./MachinePlayer.mjs";
import { MaxPlayer } from "./MaxPlayer.mjs";
import { MinPlayer } from "./MinPlayer.mjs";

export class MinimaxMachinePlayer extends MachinePlayer {

    constructor(indexColor, board) {
        super(indexColor, board);
    }

    accept(visitor){
        visitor.visitMinimaxMachinePlayer();
    }

    setColumn(){
        const maxPlayer = new MaxPlayer(this.getColor());
        const minPlayer = new MinPlayer(this.getColor().getOpposite());
        minPlayer.setOpposite(maxPlayer);
        maxPlayer.setOpposite(minPlayer);

        const cost = maxPlayer.getCost(0,this.getBoard());
        this.getCoordinate().setColumn(cost.getColumn());
    }
    
}