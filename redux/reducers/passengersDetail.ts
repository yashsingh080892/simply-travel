import * as t from "../types";
import {AnyAction} from "redux";

export interface PassengerDetail{
    firstName : string,
    lastName : string,
    gender : string,
    dob: {
        date : number,
        month : number,
        year : number
    },
    passport:{
        number : string,
        nationality : string,
        issueCountry : string,
        expiryDate : {
            date : number,
            month : number,
            year : number
        }
    },
    error:boolean,
    isSaved:boolean
}

export interface GstInformation {
    useGst: boolean,
    gstNumber: string,
    companyName: string
}
export interface Addon{
    status : boolean,
    amount : number
}
export interface Addons extends Record<string, any>{
    covidInsurance:Addon,
    packageProtection:Addon,
    covidTest:Addon
}
export interface ContactDetails {
    countryCode: string,
    phoneNumber: string,
    email: string
}
export interface PassengersDetail extends Record<string, any> {
    adult: PassengerDetail[],
    children: PassengerDetail[],
    infants: PassengerDetail[],
    gstInformation: GstInformation,
    contactDetails: ContactDetails,
    selectedSeats: string[],
    addons: Addons
};


const defaultState = {
    adult:[],
    children:[],
    infants:[],
    gstInformation:{
        useGst:false,
        gstNumber:'',
        companyName:''
    },
    contactDetails:{
        countryCode : '+91',
        phoneNumber : '',
        email : ''
    },
    selectedSeats:[],
    addons:{
        covidInsurance:{
            status : false,
            amount : 15
        },
        packageProtection:{
            status : false,
            amount : 3
        },
        covidTest:{
            status : false,
            amount : 5
        }
    }
}

const getPassengerInitialFormData = () => {
    return {
        firstName : '',
        lastName : '',
        gender : '',
        dob: {
            date : 0,
            month : 0,
            year : 0
        },
        passport:{
            number : '',
            nationality : '',
            issueCountry : '',
            expiryDate : {
                date : 0,
                month : 0,
                year : 0
            }
        },
        error:false,
        isSaved:true
    };
};

const passengersDetail = (state:PassengersDetail = defaultState, action:AnyAction):PassengersDetail => {
    switch(action?.type){
        case t.INITIATE_PASSENGERS_FORM:{
            const { adult=0 , children=0 , infants=0 } = action.payload;
            const _state = {...state};
            if(adult){
                _state.adult = [];
                for( let i=0 ; i<adult ; i++ ){
                    _state.adult.push(getPassengerInitialFormData());
                }
            }
            if(children){
                _state.children = [];
                for( let i=0 ; i<children ; i++ ){
                    _state.children.push(getPassengerInitialFormData());
                }
            }
            if(infants){
                _state.infants = [];
                for( let i=0 ; i<infants ; i++ ){
                    _state.infants.push(getPassengerInitialFormData());
                }
            }
            return {..._state};
        }
        case t.UPDATE_GST_DATA:{
            return {...state,gstInformation: action.payload};
        }
        case t.UPDATE_CONTACT_DATA:{
            return { ...state, contactDetails: action.payload};
        }
        case t.SET_PASSENGER_DETAIL:{
            const ageStage = action.payload.type;
            const index = action.payload.index;
            let datas = state[ageStage];
            const passengerData = action.payload.data;
            passengerData.isSaved=true;
            passengerData.error=false;
            datas[index] = passengerData;
            return {...state, [ageStage] : [...datas] };
        }
        case t.ADD_NEW_PASSENGER:{
            const ageStage = action.payload.type;
            return { ...state , [ageStage]:[...state[ageStage],getPassengerInitialFormData()] }
        }
        case t.SET_SELECTED_SEATS:{
            return { ...state , selectedSeats: [...action.payload.selectedSeats] };
        }
        case t.REMOVE_SELECTED_SEATS:{
            return { ...state , selectedSeats: [] };
        }
        case t.REMOVE_PASSENGER_DETAIL:{
            const ageStage = action.payload.type;
            const index = action.payload.index;
            let passengerDetails = state[ageStage];
            passengerDetails.splice(index, 1);
            return {...state,[ageStage]:[...passengerDetails]};
        }
        case t.ADD_ADDON:{
            const addon = action.payload.addon;
            let addons = state.addons;
            addons[addon].status = true;
            return {...state,addons:{...addons}}
        }
        case t.REMOVE_ADDON:{
            const addon = action.payload.addon;
            let addons = state.addons;
            addons[addon].status = false;
            return {...state,addons:{...addons}}
        }
        default:
            return {...state};
    }
}

export default passengersDetail;