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
import LoginButton from "../login-button";
import Signup from "../signup";
import Login from "../login";

function singleTripFlightList(): any {
    let flightList = JsonData.flights[0];
    let flightArray1: any = [];
    let airLines = JsonData.airlines;

    Object.keys(flightList).map((key) => {
        // @ts-ignore
        if (key == "multi-flight") {
            return null;
            /*let flightListKey = flightList[key];
            let multiFlight = {...flightListKey, flightName: key, tt: flightListKey[0].tt};
            // @ts-ignore
            multiFlight["tr_path"] = [];
            // @ts-ignore
            multiFlight["airlines"] = [];
            // @ts-ignore
            multiFlight["flightIds"] = {};
            Object.keys(flightListKey).map((flight) => {
                // @ts-ignore
                let multiFlightList = flightListKey[flight]["flights"];
                // @ts-ignore
                for (let i = 0; i < multiFlightList.length; i++) {
                    // @ts-ignore
                    Object.keys(multiFlightList[i]).map((airlineId) => {
                        let airLineData = airLines.find(al => airlineId == al.id);
                        // @ts-ignore
                        multiFlight["airlines"].push(airLineData);
                        // @ts-ignore
                        multiFlight["trips"] = [];
                        // @ts-ignore
                        let flightIds = [];
                        Object.keys(multiFlightList[i][airlineId]).map((flightId) => {
                            // @ts-ignore
                            multiFlight["trips"].push({"tr_path": [...multiFlightList[i][airlineId][flightId]["trips"][0]["tr_path"] ]});
                            // @ts-ignore
                            flightIds.push(multiFlightList[i][airlineId][flightId]["f_id"]);
                        });
                        // @ts-ignore
                        multiFlight["flightIds"][airLineData.name] = flightIds;
                        // @ts-ignore
                    });
                }
            });
            // @ts-ignore
            multiFlight.ph_price = multiFlight[0].ph_price;
            flightArray1.push(multiFlight);*/
        } else {
            // @ts-ignore
            for (let i = 0; i < flightList[key].length; i++) {
                // @ts-ignore
                console.log(flightList[key][i]);
                // @ts-ignore
                flightArray1.push({...flightList[key][i], flightData: airLines.find(al => al.id == key)});
            }
        }
    });
    return flightArray1;
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

const RoundTripFlightList = (props:FlightListProps) => {
    let cities:any = JsonData.cities;
    let [showFlightDetail, setShowFlightDetail] = useState(false);
    let [flightArray, setFlightArray] = useState(singleTripFlightList);
    let departDate = moment(props.selectedDate[0]?.depart?.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ')
    let returnDate = moment(props.selectedDate[0]?.return?.data, 'YYYY-MM-DDTHH:mm:ss.SSSZ')

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
        {props.flightArray?.length == 0 && <div className="bg-white w-full mt-8 ml-7 rounded-10 h-fit flex justify-center">
            <ImageWithAssetPrefix src={assetPrefix+"/empty-search.svg"} alt="" className="m-auto" width={300} height={223}/></div>}
        {props.flightArray?.length != 0 &&
            <>
                <div className={"w-full mt-8 ml-7"}>
                    {
                        props.from && props.to &&
                        <div className="w-full text-secondary text-2xl pb-5">Flights from {props.from} to {props.to}</div>
                    }
                    <div className="rounded-10 overflow-hidden">
                        <div className="bg-white">
                            <div className="flex flex-wrap text-center text-secondary">
                                <div className="flex w-full text-sm font-bold py-1.5 px-5 cursor-pointer">
                                    <div className="w-1/4 flex justify-center">
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
                                                <div className="flex" onClick={() => props.sortBy('tt')} id={'sortBy-tt'}>Duration
                                                    <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/>
                                                </div>
                                            </div>
                                            <div className="w-1/3 translate-x-1/2 flex justify-center">
                                                <div className="flex" onClick={() => props.sortBy('at')} id={'sortBy-at'}>Arrival
                                                    <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/down-arrow.svg"} alt="" className="w-2 pl-0.5"/></div>
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
                                            <div className="flex flex-wrap pb-5">
                                                <div className="w-1/4 text-secondary mr-auto">
                                                    <FlightsUsed flight={flight}/>
                                                </div>
                                                <div className="w-3/4 pb-5">
                                                    <div
                                                        className="w-1/4 right-0 text-center my-auto h-full align-middle flex flex-row flex-wrap content-center ml-auto">
                                                        <div className="flex flex-col ml-auto mr-12">
                                                            <span
                                                                className="font-bold w-full pb-1.5 pt-1.5">{flight.price}</span>
                                                            <span
                                                                className="text-primary text-xs text-bold w-full pb-2.5 cursor-pointer"
                                                                onClick={() => setCurrentFlightDetails(flight)}
                                                                // id={'viewDetails-'+flight.f_id.replace(" ","-")}

                                                            >View Details</span>
                                                        </div>
                                                        <div className="flex flex-col pl-6 ml-auto mr-8">
                                                            <button
                                                                className="bg-primary text-white rounded-5 px-3 py-1 text-base font-semibold h-8 mx-auto"
                                                                // id={'bookNow-'+flight.f_id.replace(" ","-")}
                                                                onClick={()=>{checkLogin(flight)}}>Book Now</button>
                                                            <span
                                                                className="text-ts-green text-xs text-bold w-full pt-1.5">Refund</span>
                                                        </div>
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

                                                <div className="w-1/2 pl-9">
                                                    <div className="relative">
                                                        <div
                                                            className="font-bold text-sm pb-1.5 after:content after:border after:absolute after:w-2/12 after:bottom-0 after:left-0 after:border-grey text-secondary">
                                                            Depart
                                                            from {flight[0].fromLocation}
                                                        </div>
                                                    </div>
                                                    <div className="pt-16 -ml-16 -mr-4">
                                                        <TravelTimeline tr_path={flight[0]}
                                                                        tr_duration={flight.tt}
                                                                        selectedDate={departDate}
                                                                        setFlightTime={(flightTime: any) => {
                                                                            setFlightDataState(flightTime, i)
                                                                        }}/>
                                                    </div>
                                                </div>
                                                <div className="w-1/2 border-l border-grey pl-9">
                                                    <div className="relative">
                                                        <div
                                                            className="font-bold text-sm pb-1.5 after:content after:border after:absolute after:w-2/12 after:bottom-0 after:left-0 after:border-grey text-secondary">
                                                            Return
                                                            from {flight[0].toLocation}
                                                        </div>
                                                    </div>
                                                    <div className="pt-16 -ml-16 -mr-4">
                                                        <TravelTimeline tr_path={flight[1]}
                                                                        tr_duration={flight.tt}
                                                                        selectedDate={returnDate}
                                                                        setFlightTime={(flightTime: any) => {
                                                                            setFlightDataState(flightTime, i)
                                                                        }}/>
                                                    </div>
                                                </div>
                                                <div className="w-1/4 text-secondary m-auto hidden">
                                                    <FlightsUsed flight={flight[1]}/>
                                                </div>
                                                <div className="w-3/4 pt-16 hidden">
                                                    <TravelTimeline tr_path={flight[1]}
                                                                    tr_duration={flight.tt}
                                                                    selectedDate={departDate}
                                                                    setFlightTime={(flightTime: any) => {
                                                                        setFlightDataState(flightTime, i)
                                                                    }}/>
                                                </div>
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
                        setShowFlightDetail(false);
                        return {};
                    }} flight={currentFlight}/>
                </Modal>
            </>
        }
    </>
    )
}

export default connect(mapStateToProps,{})(RoundTripFlightList);
