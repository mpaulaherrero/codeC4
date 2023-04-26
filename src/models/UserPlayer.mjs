import { Player } from './Player.mjs';
import { assert} from "../utils/assert.mjs";

export class UserPlayer extends Player {
    
    constructor(indexColor, board) {
        super(indexColor, board);
    }

    accept(visitor){
        visitor.visitUserPlayer();
    }

    setColumn(){
        assert(false,"El usuario escoge su columna mediante la vista");
    }
    
}