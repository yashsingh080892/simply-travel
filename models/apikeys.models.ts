import {serializable} from "serializr";

export class ApiKeys {

    @serializable
    public name?:String;

    @serializable
    public email?:String;

    @serializable
    public userId?:number;

}