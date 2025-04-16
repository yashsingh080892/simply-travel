import {serializable, deserialize} from "serializr";

export class Addons {

    @serializable
    public title!:string;

    @serializable
    public description!:string;

    @serializable
    public price!:number;

    @serializable
    public type!:string;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(Addons, input));
    }
}
