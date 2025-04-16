import api from "../api/instance";
import {BookingDetails} from "../models/booking-details.model";
import {booking} from "../environment/env.local";

const create = (bookingDetails: BookingDetails) => {
    return api.post(booking, bookingDetails).then(res => new BookingDetails().deserialize(res))
};

const update = (id: any) => {
    // @ts-ignore
    return api.put(booking + `/${ id }`, {}).then(res => new BookingDetails().deserialize(res.content))
};

const show = (getStatus: any) => {
    // @ts-ignore
    return api.get(booking + `?query=status:${ getStatus }`).then(res => (res.content));
}
const showById = (id: number) => {
    return api.get(booking + `/${ id }`).then(res => (res));
}

const BookingDetailsService = {
    create,
    show,
    update,
    showById
}
export default BookingDetailsService;
