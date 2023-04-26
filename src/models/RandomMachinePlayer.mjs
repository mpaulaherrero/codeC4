import { MachinePlayer } from "./MachinePlayer.mjs";

export class RandomMachinePlayer extends MachinePlayer {

    constructor(indexColor, board) {
        super(indexColor, board);
    }

    accept(visitor){
        visitor.visitMachinePlayer();
    }

    setColumn(){
       const emptyColumns = this.getBoard().getEmptyColumns();
       this.getCoordinate().setColumn(emptyColumns[Math.floor(Math.random() * emptyColumns.length)]);
    }
}