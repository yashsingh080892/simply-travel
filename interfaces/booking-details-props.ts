import {ContactDetails, PassengerDetail} from "../redux/reducers/passengersDetail";
import {TripFlightDetail} from "../redux/reducers/flightDetail";

export interface bookingDetailsProperties {
    adult:PassengerDetail[],
    children:PassengerDetail[],
    infants:PassengerDetail[],
    selectedFlightDetail:TripFlightDetail|null,
    classType?:string,
    selectedSeats:string[],
    contactDetails:ContactDetails,
    adultCount:number,
    childrenCount:number,
    infantsCount:number,
    addonsAmount:number
}