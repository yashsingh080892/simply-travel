import api from "../api/instance";
import {PaymentDetails} from "../models/payment-details.model";
import {payments} from "../environment/env.local";

const getById = (id: any) => {
    return api.get(`${ payments }/${id}`).then(res => console.log(res));
}
const savePaymentDetails =  (paymentDetails: PaymentDetails) => {
    return api.post(payments,paymentDetails ).then(res => console.log(res))
};
    const PaymentsDetailsService = {
    getById, savePaymentDetails,
}
export default PaymentsDetailsService;
