import * as t from "../types";
import {AnyAction} from "redux";

export interface TrPathPoint{
    "ct_id": string,
    "dt"?: string,
    "at"?: string
}

export interface TripTrWay{
    tr_path : TrPathPoint[]
}

export interface FlightData{
    name: string,
    id: string,
    price: number,
    "logo-url": string,
    flight_ids: string[]
}

export interface TripFlightDetail{
    trips: TripTrWay[],
    ph_price: number,
    price: number,
    f_id: string,
    tt: string,
    flightData: FlightData,
    stops: number,
    lt: number,
    refundable: boolean,
    dt: string,
    at: string
}

export interface FlightDetail{
    selectedFlightDetail:TripFlightDetail|null
}

const defaultState = {
    selectedFlightDetail:null
}

const flightDetail = (state:FlightDetail = defaultState, action:AnyAction):FlightDetail => {
    switch(action.type){
        case t.SET_SELECTED_FLIGHT_DETAILS:
            return { selectedFlightDetail: action.payload };
        default:
            return {...state};
    }
}

export default flightDetail;