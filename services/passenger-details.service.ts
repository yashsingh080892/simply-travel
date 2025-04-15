import api from "../api/instance";
import {PassengerDetails} from "../models/passengers-detais.model";
import {passengers} from "../environment/env.local";

const show = () => {
    return api.get(`${ passengers }`).then(res => console.log(res));
}

const savePassengerDetails =  (passenger: PassengerDetails) => {
    return api.post(`${passengers}`,passenger ).then(res => console.log(res))
};

const PassengerDetailsService = {
    show,
    savePassengerDetails,
}
export default PassengerDetailsService;
