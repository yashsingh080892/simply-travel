import {number} from "prop-types";
import {Addons, ContactDetails, GstInformation, PassengerDetail} from "../redux/reducers/passengersDetail";
import {TripFlightDetail} from "../redux/reducers/flightDetail";
import {
   addAddon,
   addPassenger,
   initPassengersForm, removeAddon, removePassenger,
   setPassengerDetails, setSeletedSeats, removeSeletedSeats,
   updateContactData,
   updateGstData
} from "../redux/actions/passengersDetailActions";
import * as t from "../redux/types";
import {ThunkDispatch} from "redux-thunk";

export interface ReviewDetailsProps{
   initPassengersForm : ({})=>{},
   setPassengerDetails : ({})=>{},
   addAddon : ({})=>void,
   removeAddon : ({})=>void,
   addPassenger : ({})=>void,
   removePassenger : ({})=>void,
   setSeletedSeats : ({})=>void,
   removeSeletedSeats : ({})=>void,
   adultCount : number,
   childrenCount : number,
   infantsCount : number,
   totalPassengers : number,
   adult:{}[],
   children:{}[],
   infants:{}[],
   selectedSeats:string[],
   gstInformation:{
      useGst:boolean,
      gstNumber:string,
      companyName:string
   },
   contactDetails:{
      countryCode : string,
      phoneNumber : string,
      email : string
   },
   selectedFlightDetail:{
      ph_price:string|number
   },
   addons:Addon,
   addonsAmount:number
}

interface Addon {
   covidInsurance:{
      status : boolean,
      amount : number
   },
   packageProtection:{
      status : boolean,
      amount : number
   },
   covidTest:{
      status : boolean,
      amount : number
   }
}

export interface ReviewDetailsStateProps{
   adultCount:number,
   childrenCount:number,
   infantsCount:number,
   totalPassengers:number,
   adult : PassengerDetail[],
   children : PassengerDetail[],
   infants : PassengerDetail[],
   gstInformation: GstInformation,
   contactDetails : ContactDetails,
   selectedSeats : any[],
   selectedFlightDetail : TripFlightDetail|null,
   addons:Addons,
   addonsAmount:number,
   tripType:number,
   TripDetails:any
}

export interface MapDispatchToProps {
   initPassengersForm:(payload: any) => (dispatch: any) => void,
   setPassengerDetails:(payload: any) => (dispatch: any) => void,
   updateGstData:(payload: any) => (dispatch: any) => void,
   updateContactData:(payload: any) => (dispatch: any) => void,
   addPassenger:(payload: any) => (dispatch: any) => void,
   removePassenger:(payload: any) => (dispatch: any) => void,
   setSeletedSeats:(payload: any) => (dispatch: any) => void,
   removeSeletedSeats:(payload: any) => (dispatch: any) => void,
   addAddon:(payload: any) => (dispatch: any) => void,
   removeAddon:(payload: any) => (dispatch: any) => void
}