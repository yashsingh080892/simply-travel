import { serializable,deserialize} from "serializr";
import { Stops } from "./stops.model";

export class FlightDetails {
    @serializable
    public id!: number;
    @serializable
    public flightName!: string;
    @serializable
    public flightNumber!: string;
    @serializable
    public startTime!: Date;
    @serializable
    public endTime!: Date;
    @serializable
    public price!: number;
    @serializable
    public checkIn!: string;
    @serializable
    public cabin!: string;
    @serializable
    public fromLocation!: string;
    @serializable
    public toLocation!: string;
    @serializable
    public refundable!: boolean;
    @serializable
    public stops!: Stops[];
    @serializable
    public duration!: number;


    deserialize(input: any): this {
        return Object.assign(this, deserialize(FlightDetails, input));
    }
}
