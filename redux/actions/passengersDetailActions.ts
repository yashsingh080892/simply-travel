import * as t from "../types";

// @ts-ignore
export const initPassengersForm = (payload) => dispatch => {
    dispatch({
        type : t.INITIATE_PASSENGERS_FORM,
        payload
    })
}

// @ts-ignore
export const setPassengerDetails = (payload) => dispatch => {
    dispatch({
        type : t.SET_PASSENGER_DETAIL,
        payload
    })
}

// @ts-ignore
export const addPassenger = ( payload ) => dispatch => {
    dispatch({
        type : t.ADD_NEW_PASSENGER,
        payload
    })
};

// @ts-ignore
export const removePassenger = ( payload ) => dispatch => {
    dispatch({
        type : t.REMOVE_PASSENGER_DETAIL,
        payload
    })
};

// @ts-ignore
export const updateGstData = (payload) => dispatch => {
    dispatch({
        type: t.UPDATE_GST_DATA,
        payload
    })
}

// @ts-ignore
export const updateContactData = (payload) => dispatch => {
    dispatch({
        type: t.UPDATE_CONTACT_DATA,
        payload
    })
}

// @ts-ignore
export const setSeletedSeats = ( payload ) => dispatch => {
    dispatch({
        type : t.SET_SELECTED_SEATS,
        payload
    })
};

// @ts-ignore
export const removeSeletedSeats = ( payload ) => dispatch => {
    dispatch({
        type : t.REMOVE_SELECTED_SEATS,
        payload
    })
};

// @ts-ignore
export const addAddon = ( payload ) => dispatch => {
    dispatch({
        type: t.ADD_ADDON,
        payload
    })
};

// @ts-ignore
export const removeAddon = ( payload ) => dispatch => {
    dispatch({
        type: t.REMOVE_ADDON,
        payload
    })
};