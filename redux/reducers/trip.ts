import getCurrentDateDetails from "../../utils/dateFormater";
import * as t from "../types";

const defaultState = {
    type:1, // 1='oneWay' , 2='roundTrip' , 3='multipleTrip'
    passengersAndClass:{
        adult:1,
        children:0,
        infants:0,
        classType:1
    },
    tripDetails:[{
        from:null,
        to:null,
        depart:getCurrentDateDetails(),
        return:undefined
    }]
}
export interface CityDetail{
    cn_name : string,
    ct_name : string,
    ap_name : string,
    index : number,
    host_airlines: string[],
    offset_time: string,
    ct_id: string,
};

export interface DateDetail{
    day: string,
    month: string,
    date: number,
    year: number,
    data: Date
}

export interface TripDetail{
    from: CityDetail| null | undefined,
    to?: CityDetail| null | undefined,
    depart?: DateDetail,
    return?: DateDetail|undefined
};
export interface PassengersAndClass extends Record<string, any>{
    adult: number,
    children: number,
    infants: number,
    classType: number
};
export interface Trip {
    type: number,
    passengersAndClass: PassengersAndClass,
    tripDetails: TripDetail[]
}

const trip = (state:Trip = defaultState, action:any):Trip => {
    switch(action.type){
        case t.SET_TRIP_TYPE:
            if(action.payload==3){
                let tripDetails = state.tripDetails;
                let lastTripDetail = tripDetails[tripDetails.length-1];
                let newTrip = { from : lastTripDetail.to , depart : lastTripDetail.return };
                tripDetails.push(newTrip);
                state = {...state , tripDetails:[...tripDetails]};
            }
            else{
                let tripDetails = state.tripDetails;
                let lastTripDetail = tripDetails[0];
                state = {...state , tripDetails:[lastTripDetail]};
            }
            return {...state,type: action.payload};
        case t.ADD_ANOTHER_TRIP:{
            let tripDetails = state.tripDetails;
            let lastTripDetail = tripDetails[tripDetails.length-1];
            let newTrip = { from : lastTripDetail.to , depart : lastTripDetail.return };
            tripDetails.push(newTrip);
            return {...state , tripDetails:[...tripDetails]};
        }
        case t.REMOVE_LAST_TRIP:{
            let tripDetails = state.tripDetails;
            tripDetails = tripDetails.slice(0, -1);
            return {...state , tripDetails:[...tripDetails]};
        }
        case t.SET_TRIP_FROM:{
            let index = action.payload.index || 0;
            let tripDetails = state.tripDetails;
            let tripDetail = tripDetails[index];
            tripDetail.from = action.payload;
            tripDetails[index] = tripDetail;
            return {...state , tripDetails:[...tripDetails]};
        }
        case t.SET_TRIP_TO:{
            let index = action.payload.index || 0;
            let tripDetails = state.tripDetails;
            let tripDetail = tripDetails[index];
            tripDetail.to = action.payload;
            tripDetails[index] = tripDetail;
            return {...state , tripDetails:[...tripDetails]};
        }
        case t.TOGGLE_FROM_TO_LOCATIONS:{
            let tripDetails = state.tripDetails;
            let tripDetail = tripDetails[0];
            tripDetail = Object.assign({},tripDetail,{from:tripDetail.to,to:tripDetail.from});
            tripDetails[0] = tripDetail;
            return {...state,tripDetails:[...tripDetails]};
        }
        case t.SET_DEPARTURE:{
            let index = action.payload.index || 0;
            let tripDetails = state.tripDetails;
            let tripDetail = tripDetails[index];
            tripDetail.depart = getCurrentDateDetails(action.payload.date);
            tripDetails[index] = tripDetail;
            return {...state , tripDetails:[...tripDetails]}
        }
        case t.SET_RETURN_DATE:{
            let index = action.payload.index || 0;
            let tripDetails = state.tripDetails;
            let tripDetail = tripDetails[index];
            tripDetail.return = getCurrentDateDetails(action.payload.date);
            tripDetails[index] = tripDetail;
            return {...state , tripDetails:[...tripDetails]}
        }
        case t.SET_PASSENGERS_AND_CLASS:{
            let passengersAndClass = state.passengersAndClass;
            return {...state,passengersAndClass:{...passengersAndClass,...action.payload}};
        }
        case t.ADD_NEW_PASSENGER:{
            let type = action.payload.type;
            let passengersAndClass = state.passengersAndClass;
            passengersAndClass[type] = passengersAndClass[type]+1;
            return {...state,passengersAndClass:{...passengersAndClass}};
        }
        case t.REMOVE_PASSENGER_DETAIL:{
            let type = action.payload.type;
            let passengersAndClass = state.passengersAndClass;
            passengersAndClass[type] = passengersAndClass[type]-1;
            return {...state,passengersAndClass:{...passengersAndClass}};
        }
        default:
            return {...state};
    }
}

export default trip;