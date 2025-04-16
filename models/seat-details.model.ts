import {deserialize, list, primitive, serializable} from "serializr";


export class SeatDetails {
    @serializable
    columnName: string = "";
    @serializable
    numberOfRows: number = 0;
    @serializable(list(primitive()))
    businessRows: number[] = [];
    @serializable(list(primitive()))
    premiumRows: number[] = [];
    @serializable(list(primitive()))
    exitRows: number[] = [];
    @serializable(list(primitive()))
    economyRows: number[] = [];

    deserialize(input: any): this {
        return Object.assign(this, deserialize(SeatDetails, input));
    }
}