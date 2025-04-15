import * as t from "../types";

/* fav filter actions */
// @ts-ignore
export const setFavFilter = (name) => dispatch => {
    dispatch({
        type: t.SET_FAV_FILTER,
        payload: name
    });
};
// @ts-ignore
export const removeFavFilter = (name) => dispatch => {
    dispatch({
        type: t.REMOVE_FAV_FILTER,
        payload: name
    });
};

/* range filter actions */
// @ts-ignore
export const setPriceRange = (range) => dispatch => {
    dispatch({
        type:t.SET_PRICE_RANGE,
        payload:range
    })
};
// @ts-ignore
export const setDurationRange = (range) => dispatch => {
    dispatch({
        type:t.SET_DURATION_RANGE,
        payload:range
    })
};
// @ts-ignore
export const setLayoverDurationRange = (range) => dispatch => {
    dispatch({
        type:t.SET_LAYOVER_DURATION_RANGE,
        payload:range
    })
};

/* stops filter actions */
// @ts-ignore
export const setStopsFilter = (stops) => dispatch => {
    dispatch({
        type: t.SET_STOPS_FILTER,
        payload: stops
    });
};
// @ts-ignore
export const removeStopsFilter = (stops) => dispatch => {
    dispatch({
        type: t.REMOVE_STOPS_FILTER,
        payload: stops
    });
};

/* AIRLINES filter actions */
// @ts-ignore
export const setAirlinesFilter = (airline) => dispatch => {
    dispatch({
        type: t.SET_AIRLINES,
        payload: airline
    });
};
// @ts-ignore
export const removeAirlinesFilter = (airline) => dispatch => {
    dispatch({
        type: t.REMOVE_AIRLINES,
        payload: airline
    });
};