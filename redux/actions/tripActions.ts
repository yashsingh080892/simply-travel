import * as t from "../types";

// @ts-ignore
export const setTripFrom = (payload) => dispatch => {
    dispatch({
        type: t.SET_TRIP_FROM,
        payload
    });
};

// @ts-ignore
export const setTripTo = (payload) => dispatch => {
    dispatch({
        type: t.SET_TRIP_TO,
        payload
    });
};

// @ts-ignore
export const setDeparture = (payload) => dispatch => {
    dispatch({
        type : t.SET_DEPARTURE,
        payload
    })
};

// @ts-ignore
export const setReturnDate = (payload) => dispatch => {
    dispatch({
        type : t.SET_RETURN_DATE,
        payload
    })
};

// @ts-ignore
export const setPassengersAndClass = (payload) => dispatch => {
    dispatch({
        type : t.SET_PASSENGERS_AND_CLASS,
        payload
    })
};

// @ts-ignore
export const setTripType = (value) => dispatch => {
    dispatch({
        type : t.SET_TRIP_TYPE,
        payload : value
    })
};

// @ts-ignore
export const addNewTrip = () => dispatch => {
    dispatch({
        type : t.ADD_ANOTHER_TRIP
    })
};

// @ts-ignore
export const removeLastTrip = () => dispatch => {
    dispatch({
        type : t.REMOVE_LAST_TRIP
    })
};

// @ts-ignore
export const toggleFromToLocations = () => dispatch => {
    dispatch({
        type : t.TOGGLE_FROM_TO_LOCATIONS
    })
};