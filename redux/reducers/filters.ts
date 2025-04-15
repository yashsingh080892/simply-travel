import * as t from "../types";
import {AnyAction} from "redux";

const defaultState = {
    favFilters:[],
    stopsCount:[],
    airlines:[],
    priceRange: 8000,
    durationRange: 1440,
    layoverDurationRange : 1440
}

export interface Filters{
    favFilters : string[],
    stopsCount : number[],
    airlines : string[],
    priceRange: number,
    durationRange: number,
    layoverDurationRange : number
}


const filters = (state:Filters = defaultState, action:AnyAction):Filters => {
    switch(action.type){
        case t.SET_FAV_FILTER:
            return {
                ...state,
                favFilters: [...state.favFilters,action.payload]
            };
        case t.REMOVE_FAV_FILTER:{
            let favFilters = state.favFilters.filter((favFilter)=>{ return favFilter!==action.payload });
            return { ...state, favFilters };
        }
        case t.SET_PRICE_RANGE:
            return { ...state, priceRange: action.payload };
        case t.SET_DURATION_RANGE:
            return { ...state, durationRange:action.payload };
        case t.SET_LAYOVER_DURATION_RANGE:
            return { ...state , layoverDurationRange: action.payload }
        case t.SET_STOPS_FILTER:
            return {...state,stopsCount:[...state.stopsCount,action.payload]}
        case t.REMOVE_STOPS_FILTER: {
            let stopsCount = state.stopsCount.filter((stopCount)=> stopCount!==action.payload );
            return {...state,stopsCount};
        }
        case t.SET_AIRLINES:
            return {...state,airlines:[...state.airlines,action.payload]}
        case t.REMOVE_AIRLINES: {
            let airlines = state.airlines.filter((airline) => airline !== action.payload);
            return {...state, airlines}
        }
        default:
            return {...state};
    }
}

export default filters;