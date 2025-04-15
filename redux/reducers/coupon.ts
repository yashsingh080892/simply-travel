import * as t from "../types";
import {AnyAction} from "redux";

const defaultState = {
    couponApplied: false
}
export interface Coupon{
    couponApplied: Boolean
}
const coupon = (state:Coupon = defaultState, action:AnyAction):Coupon => {
    switch(action.type){
        case t.ADD_COUPON: {
            console.log("in");
            return {couponApplied: true}
        }
        default:
            return {...state};
    }
}

export default coupon;