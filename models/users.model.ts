import {serializable,deserialize} from "serializr";

export class Users {

    @serializable
    public firstName:String;

    @serializable
    public lastName:String;

    @serializable
    public email:String;

    @serializable
    public mobileNumber:Number;

    @serializable
    public password:String;


    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.mobileNumber = 0;
        this.password ="";
    }

    deserialize(input: any): this {
        return Object.assign(this, deserialize(Users, input));
    }
}
