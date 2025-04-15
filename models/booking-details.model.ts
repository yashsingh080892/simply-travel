import { serializable, deserialize } from "serializr";
import {JourneyDetails} from "./journey-details.model";
import {Gstinfo} from "./gstinfo.model";
import {Addons} from "./addons.model";
import {Users} from "./users.model";
import {PassengerDetails} from "./passengers-detais.model";

export class BookingDetails {
    @serializable
    public journeyDetailsRequest!: JourneyDetails[];

    @serializable
    public phNo!: string;

    @serializable
    public email!: string;

    @serializable
    public passengerDetailsRequests!: PassengerDetails[];

    @serializable
    public gstinfoRequest!: Gstinfo;

    @serializable
    public addonsRequest!: Addons;

    @serializable
    public discountCode!: string;

    @serializable
    public cost!: number;

    @serializable
    public tripType!: string;

    @serializable
    public paymentStatus!: string;

    @serializable
    public usersRequest!: Users;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(BookingDetails, input));
    }

}
