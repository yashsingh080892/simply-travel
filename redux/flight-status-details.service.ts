import api from "../api/instance";
import {BookingDetailResponse} from "../models/booking-detail-response.model";

const bookings ="/bookings";




const flightStatus =  (passenger:any) => {
    return api.post(`${bookings}`,passenger ).then(res => new BookingDetailResponse().deserialize(res))
};


const FlightStatusDetails = {
    flightStatus
}
export default FlightStatusDetails;