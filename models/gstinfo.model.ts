import {serializable} from "serializr";

export class Gstinfo {

    @serializable
    public isUse:Boolean;

    @serializable
    public gstinNumber:Number;

    @serializable
    public companyName:String;


    constructor(isUse: Boolean, gstinNumber: Number, companyName: String) {
        this.isUse = isUse;
        this.gstinNumber = gstinNumber;
        this.companyName = companyName;
    }
}