import FareSummary from "../../components/fare-summary";
import React, {useState} from "react";
import {Modal} from "@mui/material";
import Link from "next/link";
import Router, {useRouter} from "next/router";
import {InputField} from "../../components/traveler-form";
import SelectField from "../../components/select";
import {connect} from "react-redux";
import {PaymentProps} from "../../interfaces/payment-props";
import {Store} from "../../redux/store";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../../components/image/image";
import paymentDetailsService from "../../services/payment-details.service";

const thisYear = (new Date()).getFullYear();
let futureYearsType = [thisYear];

for(let i=0,lastPushedYear=thisYear;i<14;i++){
    lastPushedYear = lastPushedYear+1;
    futureYearsType.push(lastPushedYear);
}

const Payment = (props:PaymentProps) => {
    const router = useRouter();
    let bookingId:any = router?.query?.id || 0;
    let date = new Date();
    date.setMinutes(5);
    date.setSeconds(0);
    const [name, setName] = useState("");
    const [card, setCard] = useState("");
    const [month, setMonth] = useState(1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [cvv, setCvv] = useState("");

    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(5);
    const [submitted, setSubmitted] = useState(false);

    const intervalId = setInterval(() => setTimer(),1000 );

    function setTimer() {
        if(seconds == 0){
            if(minutes == 0) {
                clearInterval(intervalId)
            } else {
                setSeconds(59);
                setMinutes(minutes - 1);
            }
        } else {
            setSeconds(seconds - 1);
        }
        clearInterval(intervalId)
    }

    function paymentCancelled() {
        let text = "Payment cancelled";
        if (confirm(text) == true) {
            Router.push({pathname: "../"});
        }
    }
    const handleSubmit = () => {
        const date = new Date(); // Create a new date object
        date.setFullYear(year); // Set the year of the date
        date.setMonth(month - 1); // Set the month of the date (subtract 1 since month is 0-indexed)
        date.setDate(1);
        date.setHours(0); // Setting the hours component to 0
        date.setMinutes(0); // Setting the minutes component to 0
        date.setSeconds(0); // Setting the seconds component to 0
        const timestamp = date.getTime();

        const paymentDetails:any={
            bookingId:bookingId,
            status:"SUCCESS",
            cardNumber:card,
            type: "CARD",
            nameOnCard:name,
            expiryDate:new Date(timestamp),
            cardType:"VISA"
        }

        paymentDetailsService.savePaymentDetails(paymentDetails);
    };

    return (
        <div className="sm:container m-auto -mt-40 flex space-x-6">
            <div className="flex-wrap basis-4/5">
                <div className="flex rounded-10 mb-5 p-2 justify-center"  style={{background:"#F2C94C"}}>
                    <div className="pr-3 pt-1"><ImageWithAssetPrefix height={18} width={16} src={assetPrefix+"/warning-icon.svg"} className="mx-auto" alt=""/></div>
                    <div className="my-auto">Please do not enter any real data for security reasons.</div>
                </div>
                <div className="flex flex-col rounded-10 bg-white pb-3.5">
                    <div className="font-bold text-xl pl-7 pt-4 pb-6 w-full flex">
                        <div>Payment Options</div>
                        <div className="ml-auto text-base text-ts-red pr-10">{(minutes + " : " + seconds)} remaining</div>
                    </div>
                    <div className="flex items-start w-full">
                        <ul className="nav nav-tabs flex flex-col flex-wrap list-none border-b-0 pl-0 mr-4 w-2/6 text-base font-normal space-y-0.5"
                            id="tabs-tabVertical"
                            role="tablist">
                            <li className="nav-item flex-grow text-center bg-ts-light-grey rounded-r-5 cursor-not-allowed" role="presentation">
                                <div className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0
                             border-t-0 border-b-2 border-transparent px-6 hover:border-transparent
                              hover:bg-gray-100 focus:border-transparent active flex"
                                >
                                    <ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/payment-type-icons/upi.svg"} alt=""/>
                                    <div className="my-auto pl-7 py-6 text-lg font-normal">UPI</div>
                                </div>
                            </li>
                            <li className="nav-item flex-grow text-center rounded-r-5" role="presentation">
                                <div className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0
                             border-t-0 border-b-2 border-transparent px-6 hover:border-transparent
                              hover:bg-gray-100 focus:border-transparent flex"
                                ><ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/payment-type-icons/card-icon.svg"} alt=""/>
                                    <div className="my-auto pl-7 py-6 text-lg font-normal">Debit / Credit / ATM Card</div>
                                </div>
                            </li>
                            <li className="nav-item flex-grow text-center bg-ts-light-grey rounded-r-5 cursor-not-allowed" role="presentation">
                                <div className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0
                            border-t-0 border-b-2 border-transparent px-6 hover:border-transparent
                            hover:bg-gray-100 focus:border-transparent flex"
                                ><ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/payment-type-icons/net-banking.svg"} alt=""/>
                                    <div className="my-auto pl-7 py-6 text-lg font-normal">Net Banking</div>
                                </div>
                            </li>
                            <li className="nav-item flex-grow text-center bg-ts-light-grey rounded-r-5 cursor-not-allowed" role="presentation">
                                <div className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0
                            border-t-0 border-b-2 border-transparent px-6 hover:border-transparent
                            hover:bg-gray-100 focus:border-transparent flex"
                                ><ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/payment-type-icons/gift-card-icon.svg"} alt=""/>
                                    <div className="my-auto pl-7 py-6 text-lg font-normal">Gift Cards, Wallets & More</div>
                                </div>
                            </li>
                            <li className="nav-item flex-grow text-center bg-ts-light-grey rounded-r-5 cursor-not-allowed" role="presentation">
                                <div className=" nav-link block font-medium text-xs leading-tight uppercase border-x-0
                            border-t-0 border-b-2 border-transparent px-6 hover:border-transparent
                            hover:bg-gray-100 focus:border-transparent flex"
                                ><ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/payment-type-icons/emi.svg"} alt=""/>
                                    <div className="my-auto pl-7 py-6 text-lg font-normal">EMI</div>
                                </div>
                            </li>
                            <li className="nav-item flex-grow text-center bg-ts-light-grey rounded-r-5 cursor-not-allowed" role="presentation">
                                <div className=" nav-link block font-medium text-xs leading-tight
                            uppercase border-x-0 border-t-0 border-b-2 border-transparent px-6
                            hover:border-transparent hover:bg-gray-100 focus:border-transparent flex my-auto"
                                ><ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/payment-type-icons/pay-later.svg"} alt=""/>
                                    <div className="my-auto pl-7 py-6 text-lg font-normal">Pay Later</div>
                                </div>
                            </li>
                        </ul>
                        <div className="tab-content w-4/6 px-10" id="tabs-tabContentVertical">
                            <div className="tab-pane fade show active"
                                 aria-labelledby="tabs-home-tabVertical">
                                <div className="text-base font-bold pb-2.5 border-b border-grey text-lg">Visa, Master, Rupay, Amex and More</div>
                                <div className="flex flex-col relative pt-8">
                                    <div className="flex w-full text-base">
                                        <label className="font-normal pb-3.5">Card Number</label>
                                    </div>
                                    <InputField placeholder={"Card No."} id={'card-no'}onChange={(value)=> {setCard(value)}} className="!w-full" />
                                    {submitted && (card?.length < 16) && <div className="absolute text-ts-red font-normal text-xs -bottom-0 -mb-4">Please enter valid 16-digit card number</div>}
                                </div>
                                <div className="flex flex-col pt-7 relative">
                                    <label className="font-normal text-base pb-3.5">Name on Card</label>
                                    <InputField id={'card-name'} placeholder={"Card Name"} onChange={(value)=> {setName(value)}} className="!w-full" />
                                    {submitted && (!/^[a-zA-Z]+$/.test(name) || name?.length === 0) && <div className="absolute text-ts-red font-normal text-xs -bottom-0 -mb-4">Please enter a valid name</div>}
                                </div>
                                <div className="flex justify-between pt-7">
                                    <div className="space-y-3.5">
                                        <label className="font-normal text-base mb-3.5">Expiry Month & Year</label>
                                        <div className="flex space-x-8">
                                            <SelectField id={'exp-month'} value={month} types={[1,2,3,4,5,6,7,8,9,10,11,12]} onChange={(e)=>{
                                                // @ts-ignore
                                                setMonth(e)}} className="w-28" />
                                            <SelectField id={"exp-year"} value={year} types={futureYearsType} onChange={(e)=>{
                                                // @ts-ignore
                                                setYear(e)}} className="w-28" />
                                        </div>
                                    </div>
                                    <div className="space-y-3.5">
                                        <label className="font-normal text-base mb-3.5">Card CVV</label>
                                        <InputField id={'cvv'}placeholder={"CVV"} type={"password"} value={cvv} onChange={setCvv} className="!w-full" />
                                        {submitted && (cvv?.length !== 3)&& <div className="text-ts-red font-normal text-xs !mt-0 py-1">Please enter 3-digit CVV</div>}
                                    </div>
                                </div>
                                <div className="pt-5 pb-4 font-bold w-full">
                                    $ 25, 308
                                </div>
                                <button className="bg-primary text-white px-6 rounded-5 h-9 spacing mr-3 disabled:opacity-75 disabled:cursor-not-allowed"
                                        onClick={()=>{
                                            setSubmitted(true)
                                            if(!(card?.length < 16 || cvv?.length < 3 || name?.length == 0 || month?.toString()?.length == 0 || year?.toString()?.length == 0)){
                                                handleSubmit();
                                                Router.push({pathname: "/booking_details", query: {id: bookingId}})
                                            }
                                        }} id={'pay-now'}>Pay Now</button>
                                <button className="text-primary border-primary border rounded-5 h-9 px-6" onClick={paymentCancelled} id={'payment-cancel'}>Cancel</button>
                                <div className="text-base pt-4 text-secondary text-xs">
                                    By Continuing to pay, I understand and agree with the <span className="text-primary cursor-pointer">Privacy Policy</span> , the <span className="text-primary cursor-pointer">User agreement</span> and <span className="text-primary cursor-pointer">Terms of Service</span> of Simply Travel.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex basis-1/5 flex-col">
                <div className="sticky top-10 space-y-6">
                    <FareSummary
                        discount={false}
                        baseFare={Number(props.selectedFlightDetail?.ph_price||500)}
                        adultCount={props.adultCount}
                        childrenCount={props.childrenCount}
                        infantsCount={props.infantsCount}
                        addonsAmount={props.addonsAmount}
                    />
                </div>
            </div>
            <Modal open={seconds==0 && minutes==0}>
                <div className="w-full h-full flex">
                    <div className="bg-white py-6 px-6 outline-none rounded-10 m-auto">
                        <div className="text-base font-semi-bold px-12 py-8 m-auto bg-white flex flex-col text-center text-secondary">
                            Your payment session<br/>
                            has been expired.
                            <Link href="/home">
                                <button className="ts-t-primary-btn my-6 w-fit px-8 mx-auto">Go to Home</button>
                            </Link>
                            <a onClick={() =>{setMinutes(5); setSeconds(0)}} className="cursor-pointer"> Retry Payment </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
const mapStateToProps = (state:Store) => {

    const passengersDetail = state.passengersDetail;

    const trip = state?.trip;
    const passengersAndClass = trip?.passengersAndClass;
    const adultCount = passengersAndClass.adult||0;
    const childrenCount = passengersAndClass.children||0;
    const infantsCount = passengersAndClass.infants||0;

    const addons = passengersDetail?.addons;
    const addonsAmount = ( addons.covidInsurance.status ? addons.covidInsurance.amount : 0 )+( addons.packageProtection.status ? addons.packageProtection.amount : 0 )+( addons.covidTest.status ? addons.covidTest.amount : 0 );

    return {
        adultCount,
        childrenCount,
        infantsCount,
        addonsAmount,
        selectedFlightDetail : state.flightDetail?.selectedFlightDetail,
    };
};

// @ts-ignore
export default connect(mapStateToProps,{})(Payment);
