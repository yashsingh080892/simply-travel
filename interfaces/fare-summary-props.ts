import {Coupon} from "../redux/reducers/coupon";

export interface FareSummaryProps{
    baseFare:number,
    adultCount:number,
    childrenCount:number,
    infantsCount:number,
    addonsAmount:number,
    coupon: Coupon
    addCoupon: ()=>void;
    discount: boolean;
};