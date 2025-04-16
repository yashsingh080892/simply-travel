import TravelTimeline from "../travel-timeline";
import FlightsUsed from "../flights-used";
import moment from "moment/moment";
import React, {useEffect, useState} from "react";
import {Modal} from "@mui/material";
import Router from 'next/router'
import {connect} from "react-redux";
import FlightAndRefundDetail from "../flight-refund-details";
import {FlightListProps} from "../../interfaces/flight-list-props";
import {Store} from "../../redux/store";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../image/image";
import flight_detailsService from "../../services/flight-details.service";
import CitiesService from "../../services/cities.service";
import LoginButton from "../login-button";
import Signup from "../signup";
import Login from "../login";

const FlightList = (props:FlightListProps) => {
    let [showFlightDetail, setShowFlightDetail] = useState(false);
    let departDate = moment(props.selectedDate[0].depart.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    let [flightArray, setFlightArray] = useState(props.flightArray);
    let [openModal, setOpenModal] = useState(false);
    let [showSignup, setShowSignup] = useState(false);
    let [showGuest, setShowGuest] = useState(false);

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
                <ImageWithAssetPrefix src={assetPrefix+"/empty-search.svg"} className="pl-0.5" alt=""
                                      width={300} height={223}/>
            </div>}
            {props.flightArray?.length != 0 &&
                <>
                    <div className={"w-full mt-8 ml-7"}>
                        {
                            props.from && props.to && <div className="w-full text-secondary text-2xl pb-5">Flights from {props.from} to {props.to}</div>
                        }
                        <div className="rounded-10 overflow-hidden">
                            <div className="bg-white">
                                <div className="flex flex-wrap text-center text-secondary">
                                    <div className="flex w-full text-sm font-bold py-1.5 px-5 cursor-pointer">
                                        <div className="w-1/4 flex">
                                            <div className="w-1/4">Sort by</div>
                                            <div className="pl-5 flex" onClick={() => props.sortBy('pop')}>Popularity
                                                <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} className="pl-0.5" alt=""/>
                                            </div>
                                        </div>
                                        <div className="w-3/4 flex ">
                                            <div className="w-2/3 mx-auto flex">
                                                <div className="w-1/3 -translate-x-1/2 flex justify-center">
                                                    <div className="flex" onClick={() => props.sortBy('dt')} id={'sortBy-dt'}>Departure
                                                        <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} className="pl-0.5" alt=""/>
                                                    </div>
                                                </div>
                                                <div className="w-1/3 flex justify-center">
                                                    <div className="flex" onClick={() => props.sortBy('tt')} id={'sortBytt'}>Duration
                                                        <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} className="pl-0.5" alt=""/>
                                                    </div>
                                                </div>
                                                <div className="w-1/3 translate-x-1/2 flex justify-center">
                                                    <div className="flex" onClick={() => props.sortBy('at')} id={'sortBy-at'}>Arrival
                                                        <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} className="pl-0.5" alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4 flex justify-center">
                                            <div className="flex"  onClick={() => props.sortBy('ph_price')} id={'sortBy-price'}>Price
                                                <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} className="pl-0.5" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex w-full bg-ts-light-grey text-xs font-normal py-1 px-5">
                                        <div className="w-1/4 flex">
                                            <div className="w-1/4"></div>
                                            {props.sortedByColumn=="pop" && <div className="pl-5">{props.isAscending? <span> Low to High </span> : <span> High to Low </span>}</div>}
                                        </div>
                                        <div className="w-3/4 flex ">
                                            <div className="w-2/3 mx-auto flex">
                                                <div className="w-1/3 -translate-x-1/2">{props.sortedByColumn=="dt" && <div>{props.isAscending? <span> Early </span> : <span> Late </span>}</div>}</div>
                                                <div className="w-1/3">{props.sortedByColumn=="tt" && <div>{props.isAscending? <span> Fastest </span> : <span> slowest </span>}</div>}</div>
                                                <div className="w-1/3 translate-x-1/2">{props.sortedByColumn=="at" && <div>{props.isAscending? <span> Early </span> : <span> Late </span>}</div>}</div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            {props.sortedByColumn=="ph_price" && <div>{props.isAscending? <span> Low to High </span> : <span> High to Low </span>}</div>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className={"ts-flight-list bg-white py-1"}>
                                {
                                    props.flightArray?.map((flight: any, i:number) =>{
                                        return (
                                            <div className="list-card m-5 rounded-10 relative" key={flight.f_id}>
                                                <div className="flex">
                                                    <div className="w-1/4 text-secondary m-auto">
                                                        <FlightsUsed flight={flight}/>
                                                    </div>
                                                    <div className="w-3/4 pt-16">
                                                        <TravelTimeline tr_path={flight}
                                                                        selectedDate={departDate}
                                                                        setFlightTime={(flightTime:any)=>{return;setFlightDataState(flightTime, i)}}/>
                                                    </div>
                                                    <div className="w-1/4 right-0 text-center my-auto h-full align-middle flex flex-row flex-wrap content-center">
                                                        <span className="font-bold w-full pb-1.5">${" "}{flight.unitPrice}</span>
                                                        <span className="text-primary text-xs text-bold w-full pb-2 cursor-pointer" onClick={()=> setCurrentFlightDetails(flight)}
                                                              // id={'viewDetails-'+flight.f_id?.replace(" ","-")}
                                                        >View Details
                                                </span>
                                                        <button className="bg-primary text-white rounded-5 px-3 py-1 text-base font-semibold h-8 mx-auto"
                                                                // id={'bookNow-'+flight.f_id.replace(" ","-")}
                                                                onClick={()=>{checkLogin(flight)}}>Book Now</button>
                                                        <span className={(flight.refundable? "text-ts-green":"text-ts-red") +" text-xs text-bold w-full pt-1.5"}>{flight.refundable? "Partial Refund":"No Refund"}</span>
                                                    </div>
                                                </div>
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
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                   <Modal open={showFlightDetail}>
                            <FlightAndRefundDetail onClose={()=> {
                                setShowFlightDetail(false);
                                return {};
                            }} flight={currentFlight}/>
                    </Modal>

                </>
            }
    </>

    )
}
const mapStateToProps=(state:Store)=>{
    const trip = state?.trip||{};
    const tripDetails = trip?.tripDetails||[];
    const currentTripData = tripDetails?.[0]||{};
    const endTripData = tripDetails?.[tripDetails.length-1];
    return {
        from : currentTripData?.from?.ct_name,
        to : endTripData?.to?.ct_name
    }
};


export default connect(mapStateToProps,{})(FlightList);
