import { combineReducers } from "redux"
import filters from "./filters";
import trip from "./trip";
import passengersDetail from "./passengersDetail";
import flightDetail from "./flightDetail";
import coupon from "./coupon";

const rootReducer = combineReducers({
    filters,
    trip,
    passengersDetail,
    flightDetail,
    coupon
});

export default rootReducer;