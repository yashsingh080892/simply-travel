import React, {useState} from "react";
import moment from "moment/moment";
import TravelTimeline from "../travel-timeline";
import FlightsUsed from "../flights-used";
import Router from "next/router";
import {Modal} from "@mui/material";
import {connect} from "react-redux";
import JsonData from "../../public/data.json";
import FlightAndRefundDetail from "../flight-refund-details";
import {FlightListProps} from "../../interfaces/flight-list-props";
import {Store} from "../../redux/store";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../image/image";
import Signup from "../signup";
import Login from "../login";

const mapStateToProps=(state: Store)=>{
    const trip = state?.trip||{};
    const tripDetails = trip?.tripDetails||[];
    return {
        tripDetails: tripDetails
    }
};

const MultiCityTripFlightList = (props:FlightListProps) => {
    let cities:any = JsonData.cities;
    let [showFlightDetail, setShowFlightDetail] = useState(false);
    let [flightArray, setFlightArray] = useState(props.flightArray);
    let selectedDate = props.selectedDate
    function setFlightDataState(flightTime: any, i: number) {
        flightArray[i] = {...flightArray[i], dt: flightTime.dt, at: flightTime.at};
        setFlightArray([]);
        setFlightArray(flightArray);
    }

    const [currentFlight, setCurrentFlight] = useState({});

    function setCurrentFlightDetails(flight: any) {
        setCurrentFlight(flight);
        setShowFlightDetail(true);
    }

    let [openModal, setOpenModal] = useState(false);
    let [showSignup, setShowSignup] = useState(false);
    let [showGuest, setShowGuest] = useState(false);
    function checkLogin(flight: any) {
        let jwt = sessionStorage.getItem("jwt_token");
        if(jwt!=null) {
            props.setSelectedFlightDetails(flight);
            Router.push({pathname: "/review_details"})
        }
        else{
            //LoginButton.handleModalOpen();
            setOpenModal(true)
        }
    }

    function flightLogin(flight : any) {
        setOpenModal(false);
        props.setSelectedFlightDetails(flight);
        Router.push({pathname: "/review_details"})
    }



    return (
        <>
            {props.flightArray?.length == 0  && <div className="bg-white w-full mt-8 ml-7 rounded-10 h-fit flex justify-center">
                <ImageWithAssetPrefix width={300} height={223} src={assetPrefix+"/empty-search.svg"} alt="" className="m-auto"/></div>}
            {props.flightArray?.length != 0 &&
                <>
                    <div className={"w-full mt-8 ml-7"}>
                        {
                            props.tripDetails?.[0]?.from && props.tripDetails?.[props.tripDetails?.length - 1]?.to &&
                            <div className="w-full text-secondary text-2xl pb-5">Flights
                                from {props.tripDetails[0].from.ct_name} to {props.tripDetails?.[props.tripDetails?.length - 1]?.to?.ct_name}</div>
                        }
                        <div className="rounded-10 overflow-hidden">
                            <div className="bg-white">
                                <div className="flex flex-wrap text-center text-secondary">
                                    <div className="flex w-full text-sm font-bold py-1.5 px-5 cursor-pointer">
                                        <div className="w-1/4 flex justify-center">
                                            <div className="w-1/4">Sort by</div>
                                            <div className="pl-5 flex" onClick={() => props.sortBy('pop')}>Popularity
                                                <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/></div>
                                        </div>
                                        <div className="w-3/4 flex ">
                                            <div className="w-2/3 mx-auto flex">
                                                <div className="w-1/3 -translate-x-1/2 flex justify-center">
                                                    <div className="flex" onClick={() => props.sortBy('dt')} id={'sortBy-dt'}>Departure
                                                        <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/>
                                                    </div>
                                                </div>
                                                <div className="w-1/3 flex justify-center">
                                                    <div className="flex" onClick={() => props.sortBy('tt')} id={'sortBy-tt'}>Duration
                                                        <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/>
                                                    </div>
                                                </div>
                                                <div className="w-1/3 translate-x-1/2 flex justify-center">
                                                    <div className="flex" onClick={() => props.sortBy('at')} id={'sortBy-at'}>Arrival
                                                        <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex justify-center">
                                            <div className="flex" onClick={() => props.sortBy('ph_price')} id={'sortBy-price'}>Price
                                                <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/></div>
                                        </div>
                                    </div>
                                    <div className="flex w-full bg-ts-light-grey text-xs font-normal py-1 px-5">
                                        <div className="w-1/4 flex justify-center">
                                            <div className="w-1/4"></div>
                                            {props.sortedByColumn == "pop" &&
                                                <div className="pl-5">{props.isAscending ? <span> Low to High </span> :
                                                    <span> High to Low </span>}</div>}
                                        </div>
                                        <div className="w-3/4 flex ">
                                            <div className="w-2/3 mx-auto flex">
                                                <div className="w-1/3 -translate-x-1/2">{props.sortedByColumn == "dt" &&
                                                    <div>{props.isAscending ? <span> Early </span> :
                                                        <span> Late </span>}</div>}</div>
                                                <div className="w-1/3">{props.sortedByColumn == "tt" &&
                                                    <div>{props.isAscending ? <span> Fastest </span> :
                                                        <span> slowest </span>}</div>}</div>
                                                <div className="w-1/3 translate-x-1/2">{props.sortedByColumn == "at" &&
                                                    <div>{props.isAscending ? <span> Early </span> :
                                                        <span> Late </span>}</div>}</div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            {props.sortedByColumn == "ph_price" &&
                                                <div>{props.isAscending ? <span> Low to High </span> :
                                                    <span> High to Low </span>}</div>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={"ts-flight-list bg-white py-1"}>
                                {
                                    props.flightArray?.map((flight: any, i: number) => {
                                        return (
                                            <div className="list-card m-5 rounded-10 relative p-5" key={flight.f_id}>

                                                <Modal
                                                    open={openModal}
                                                    onClose={() => setOpenModal(false)}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <div className={"h-screen flex"}>
                                                        <div
                                                            className={`drop-shadow-xl rounded-2xl ${
                                                                showSignup ? "signup-form" : "login-form"
                                                            } m-auto`}
                                                        >
                                                            <div className="absolute right-4 top-4">
                                                                <ImageWithAssetPrefix height={12} width={12} src={assetPrefix+"/close-icon.svg"}
                                                                                      alt="" className="cursor-pointer"
                                                                                      onClick={() => setOpenModal(false)}
                                                                    /*id={'close-svg-popup'}*/   />
                                                            </div>
                                                            <>
                                                                {showSignup && !showGuest? (
                                                                    <Signup handleLoginClose={() => flightLogin(flight)}
                                                                            setShowSignup={()=>setShowSignup(false)}
                                                                    />
                                                                ) : (
                                                                    <Login showGuest={showGuest}
                                                                           handleLoginClose={() => flightLogin(flight)}
                                                                           setShowSignup={() => setShowSignup(true)}
                                                                    />
                                                                )}
                                                            </>
                                                        </div>
                                                    </div>
                                                </Modal>

                                                <div className="flex flex-wrap pb-5">
                                                    <div
                                                        className="flex flex-wrap w-full border-b border-grey pb-2 mb-6">
                                                        <div className="w-1/4 text-secondary mr-auto">
                                                            <FlightsUsed flight={flight}/>
                                                        </div>
                                                        <div
                                                            className="w-1/4 right-0 text-center my-auto h-full align-middle flex flex-row flex-wrap content-center ml-auto">
                                                            <div className="flex flex-col ml-auto">
                                                                <span
                                                                    className="font-bold w-full pb-1.5 pt-1.5">{flight[0]?.price}</span>
                                                                <span
                                                                    className="text-primary text-xs text-bold w-full pb-2.5 cursor-pointer"
                                                                    onClick={() => setCurrentFlightDetails(flight)}>View Details</span>
                                                            </div>
                                                            <div className="flex flex-col pl-6 mr-7 -mt-0.5">
                                                                <button
                                                                    className="bg-primary text-white rounded-5 px-3 py-1 text-base font-semibold h-8 mx-auto"
                                                                    // id={'bookNow-'+flight.f_id.replace(" ","-")}
                                                                    onClick={()=>{checkLogin(flight)}}>Book Now</button>
                                                                <span
                                                                    className="text-ts-green text-xs text-bold w-full pt-1.5">Refund</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {flight?.map((trip: any, i: number) => {
                                                        return <div className="w-full flex pl-9 flex-wrap" key={i}>
                                                            <div className="text-secondary">Trip {i + 1}</div>
                                                            <div className="font-bold w-5/6 text-left pl-5">
                                                                {trip.fromLocation} to {trip.toLocation}
                                                            </div>
                                                            <div className="w-5/6 flex pl-16">
                                                                <div
                                                                    className="w-1/3 my-auto text-secondary mr-auto -ml-10">
                                                                    <FlightsUsed flight={trip}/>
                                                                </div>
                                                                <div className="w-2/3 pt-16">
                                                                    <TravelTimeline tr_path={trip}
                                                                                    selectedDate={moment(selectedDate[i]?.depart?.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ')}
                                                                                    setFlightTime={(flightTime: any) => {
                                                                                        setFlightDataState(flightTime, i)
                                                                                    }}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>



                    <Modal open={showFlightDetail}>
                        <FlightAndRefundDetail onClose={() => {
                            setShowFlightDetail(false)
                            return {};
                        }} flight={currentFlight}/>
                    </Modal>
                </>
            }
        </>
    )
}

export default connect(mapStateToProps,{})(MultiCityTripFlightList);
