import api from "../api/instance";
import {Discount} from "../models/discount.model";
import {discount} from "../environment/env.local"

const get = (code: any) => {
    // @ts-ignore
    return api.get(discount + `?query=code:${code}`).then(res => res)}


const BookingDetailsService = {
    get,
}
export default BookingDetailsService;