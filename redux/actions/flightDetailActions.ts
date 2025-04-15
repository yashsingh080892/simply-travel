import * as t from "../types";
// @ts-ignore
export const setSelectedFlightDetails = (payload) => dispatch => {
    dispatch({
        type : t.SET_SELECTED_FLIGHT_DETAILS,
        payload
    })
}