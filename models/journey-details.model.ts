import { alias, custom, deserialize, list, object, optional, serializable, SKIP } from "serializr";

export class JourneyDetails {
    @serializable
    public from: String;

    @serializable
    public to: String;

    @serializable
    public departureDate: Date;

    @serializable
    public returnDate: Date;

    @serializable
    public tripNo: number;

    @serializable
    public flightDetailsId: number;

    constructor(from: string, to: string, departureDate: Date, returnDate: Date, tripNo: number, flightDetailsId: number) {
        this.from = from;
        this.to = to;
        this.departureDate = departureDate;
        this.returnDate = returnDate;
        this.tripNo = tripNo;
        this.flightDetailsId = flightDetailsId;
    }

}