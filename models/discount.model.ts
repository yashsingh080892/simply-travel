import {serializable,deserialize} from "serializr";

export class Discount {

    @serializable
    public code!:String;

    @serializable
    public percentage!:Number;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(Discount, input));
    }
}
