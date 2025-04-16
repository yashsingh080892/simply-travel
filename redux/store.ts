import { createStore, applyMiddleware, compose } from "redux"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/rootReducer"
import thunk from "redux-thunk";
import {Filters} from "./reducers/filters";
import {Trip} from "./reducers/trip";
import {PassengersDetail} from "./reducers/passengersDetail";
import {FlightDetail} from "./reducers/flightDetail";
import {Coupon} from "./reducers/coupon";
import { composeWithDevTools } from 'redux-devtools-extension';

export interface Store {
    filters:Filters,
    trip:Trip,
    passengersDetail:PassengersDetail,
    flightDetail:FlightDetail,
    coupon:Coupon
}

const middleware = [thunk]

const makeStore = () => createStore(rootReducer,composeWithDevTools(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);