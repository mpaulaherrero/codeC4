export class Line {
    static LENGTH = 4;

    #direction
    #coordinates

    constructor (origenCoordinate, direction) {
        this.#direction = direction;
        this.#coordinates = [];

        this.#coordinates[0] = origenCoordinate;
        for (let i = 1; i < Line.LENGTH; i++) {
            this.#coordinates[i] = this.#coordinates[i - 1].shifted(this.#direction.getCoordinate());
        }
    }

    toString(){
        let msg = `${this.#direction.toString()}\n`;
        for(let i=0; i <  Line.LENGTH; i++){
            msg += ` ${this.#coordinates[i].toString()}`
        }
        return msg;
    }
    
    shift(){
        for (let i = 0; i <  Line.LENGTH; i++) {
            this.#coordinates[i] = this.#coordinates[i].shifted(this.#direction.getOppositeCoordinate());
        }
    }

    getCoordinates(){
        return this.#coordinates;
    }

    clone(){
        return new Line(this.#coordinates[0].clone(), this.#direction.clone());
    }
}