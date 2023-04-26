export class MinimaxCost {
    #column
    #value

    constructor(value){
        this.#value = value;
    }

    setColumn(column){
        this.#column = column;
    }

    getColumn(){
        return this.#column;
    }

    setValue(value){
        this.#value = value;
    }

    getValue(){
        return this.#value;
    }
}