import React, {useState, useEffect} from "react";
import {FareSummaryProps} from "../../interfaces/fare-summary-props";
import {useRouter} from "next/router";
import {connect} from "react-redux";
import {Store} from "../../redux/store";
import {addCoupon} from "../../redux/actions/couponAction";
import discountService from "../../services/discount.service";


const FareSummary = (props:FareSummaryProps) => {

    const totalTicketCount = props.adultCount + props.childrenCount + props.infantsCount;

    const totalFee = props.baseFare*totalTicketCount;
    const totalAddonFee = props.addonsAmount*totalTicketCount;
    const { asPath } = useRouter();
    const isBookingDetailsRoute = props.discount


    const [coupon, setCoupon] = useState("");
    const [couponApplied, setCouponApplied] = useState<any>(props.coupon?.couponApplied);
    const [couponAmount, setCouponAmount] = useState(0)
    const [couponPercentage, setCouponPercentage] = useState(0)
    function addCoupon(code: any) {
        discountService.get(code).then((res) => {
            // @ts-ignore
            let discount = res.content[0];
            console.log("percentage", discount.percentage);
            if (discount.percentage) {
                setCouponPercentage(discount.percentage);
            }
        });
    }

    useEffect(() => {
        if (couponPercentage) {
            PriceCalculation();
        }
    }, [couponPercentage]);

    function PriceCalculation() {
        let price = totalFee;
        let discountAmount = price * (couponPercentage / 100);
        setCouponAmount(discountAmount);
        setCouponApplied(true);
        console.log(discountAmount, price, couponPercentage);
    }


    function removeCoupon(){
        setCouponApplied(false)
    }
    return <React.Fragment>
        <div className="bg-white rounded-10 px-3 py-3">
            <div className="px-5 py-5 border-0.5 border-grey rounded-5 space-y-3.5">
                <div className="text-lg font-bold">Fare Summary</div>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">Base Fare</span>
                    <span className="text-lg font-normal">$ {props.baseFare}</span>
                </div>
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-base font-normal">
                        <span>Adult{props.adultCount>1&&'(s)'}</span>
                        <span>{ !props.adultCount ? '-': props.adultCount<10 ? `0${props.adultCount}`:props.adultCount }</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-normal">
                        <span>Children{props.childrenCount>1&&'(s)'}</span>
                        <span>{ !props.childrenCount ? '-': props.childrenCount<10 ? `0${props.childrenCount}`:props.childrenCount }</span>
                    </div>
                    <div className="flex items-center justify-between text-base font-normal">
                        <span>Infant{props.infantsCount>1&&'(s)'}</span>
                        <span>{ !props.infantsCount ? '-': props.infantsCount<10 ? `0${props.infantsCount}`:props.infantsCount }</span>
                    </div>
                </div>
                <div className="text-lg font-bold">Fee & Surcharges</div>
                <div className="flex items-center justify-between text-base font-normal">
                    <span>Total Fee & Surcharges</span>
                    <span>$ {totalFee}</span>
                </div>
                {
                    props.addonsAmount ? <React.Fragment>
                        <div className="text-lg font-bold">Other Services</div>
                        {
                            props.addonsAmount && <div className="flex items-center justify-between">
                                <span className="text-base font-normal">Addons</span>
                                <span className="text-base font-normal">$ {totalAddonFee}</span>
                            </div>
                        }
                    </React.Fragment>:null
                }
                {couponApplied?
                    <div className="flex items-center justify-between text-ts-green text-base font-bold">
                        <span>Coupon Discount</span>
                        <span>$ {couponAmount}</span>
                    </div>: null
                }
                <div className="border-0.5 border-grey"></div>
                <div className="text-lg font-bold flex items-center justify-between">
                    <span>Total Amount</span>
                    <span>$ {totalFee+totalAddonFee - (couponApplied? couponAmount : 0)}</span>
                </div>
            </div>
        </div>
        {!isBookingDetailsRoute &&
            <div
                className="rounded-10 px-4 py-4 border-['linear-gradient(to right, #6648D8, #F9AC67)'] border border-grey space-y-4">
                <div className="text-lg font-bold">Get exciting discounts</div>
                {!couponApplied ? <div className="flex items-center border-b-0.5 border-grey">
                    <input placeholder="Enter Coupon Code here" className="bg-transparent w-4/5 outline-none"
                           onChange={(e) => setCoupon(e.target.value)} id={'coupon-code'}/>
                    <span className="w-1/5 text-primary text-base font-normal text-right cursor-pointer"
                          onClick={() => addCoupon(coupon)} id={'apply'}>Apply</span>
                </div>: <div className="flex items-center border-b-0.5 border-grey">
                    <input value={coupon} className="bg-transparent w-4/5 outline-none cursor-not-allowed"
                            id={'coupon-code'} readOnly={true}/>
                    <span className="w-1/5 text-gray-500 text-base font-normal text-right cursor-pointer"
                          onClick={removeCoupon} id={'apply'}>Remove Coupon</span>
                </div>}
            </div>
        }
    </React.Fragment>
};
const mapStateToProps=(state: Store)=>{
    return {
        coupon: state?.coupon
    }
};

const mapDispatchToProps = {
    addCoupon
}

export default connect(mapStateToProps, mapDispatchToProps)(FareSummary);
