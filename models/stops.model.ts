import { serializable } from "serializr";

export class Stops {
    @serializable
    public id: number;

    @serializable
    public stopNo: number;

    @serializable
    public layoverTime: string;

    @serializable
    public cityName: string;

    constructor(id: number, stopNo: number, layoverTime: string, cityName: string) {
        this.id = id;
        this.stopNo = stopNo;
        this.layoverTime = layoverTime;
        this.cityName = cityName;
    }
}
