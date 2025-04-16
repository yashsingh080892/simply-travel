import {deserialize,serializable} from "serializr";

export class ApikeysResponse {

    @serializable
    public id?: Number;

    @serializable
    public apiKey?:String;

    @serializable
    public name?:String;

    @serializable
    public userId?:Number;

    @serializable
    public enabled?:Boolean;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(ApikeysResponse, input));
    }
}