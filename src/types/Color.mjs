export class Color {
    static RED = new Color(`Red`);
    static YELLOW = new Color(`Yellow`);
    static NULL = new Color(` `);
    
    #string;

    constructor(string) {
        this.#string = string;
    }

    static values() {
        return [Color.RED, Color.YELLOW];
    }
    
    static get(ordinal) {
        return Color.values()[ordinal];
    }

    getCode(){
        return this.#string[0];
    }

    getOpposite() {
        return Color.values()[(this.#ordinal() + 1) % Color.values().length];
    }

    #ordinal() {
        for(let i = 0; i < Color.values().length; i++){
            if (this == Color.values()[i]){
                return i;
            }
        }
        return -1;
    }

}    