import {serializable,deserialize} from "serializr";

export class LoginModel {
    @serializable
    public email!:String;

    @serializable
    public password!:String;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(LoginModel, input));
    }
}