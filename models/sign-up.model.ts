import {serializable,deserialize} from "serializr";

export class SignUp {

    @serializable
    public firstName:String;

    @serializable
    public lastName:String;

    @serializable
    public email:String;

    @serializable
    public password:String;

    @serializable
    public mobileNumber:String;

    @serializable
    public dob:string;

    @serializable
    public travelFrequency:String;

    @serializable
    public preferredAirline:String;

    @serializable
    public economy:Boolean;

    @serializable
    public business:Boolean;

    @serializable
    public preEconomy:Boolean;

    @serializable
    public firstClass:Boolean;

    @serializable
    public veg:Boolean;

    @serializable
    public nonVeg:Boolean;

    @serializable
    public vegan:Boolean;

    @serializable
    public eggean:Boolean;

    @serializable
    public profilePic:String;


    constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.mobileNumber = "";
        this.dob = "";
        this.travelFrequency = "";
        this.preferredAirline = "";
        this.economy = false;
        this.business = false;
        this.preEconomy = false;
        this.firstClass = false;
        this.veg = false;
        this.nonVeg = false;
        this.vegan = false;
        this.eggean = false;
        this.profilePic = "";
    }

    deserialize(input: any): this {
        return Object.assign(this, deserialize(SignUp, input));
    }
}