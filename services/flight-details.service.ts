import api from "../api/instance";
import {flight_details} from "../environment/env.local"
const show =(params:string) => {
    return api.get(`${ flight_details}?query=${params}`).then(res => res);
}

const FlightDetailsService = {
    show
}
export default FlightDetailsService;
