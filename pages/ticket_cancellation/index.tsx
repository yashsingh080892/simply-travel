import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import TravelTimeline from "../../components/travel-timeline";
import moment from "moment/moment";
import {TabPanelProps} from "../../interfaces/tab-panel-props";
import {Modal} from "@mui/material";
import Itenary from "../../components/itenary";
import BookingDetailsService from "../../services/booking-details.service";
import FlightsUsed from "../../components/flights-used";
import bookingDetailsService from "../../services/booking-details.service";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../../components/image/image";

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${id(index+1)}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function id(index:any){
    var idMapper = new Map();
    idMapper.set(1,"one");
    idMapper.set(2,"two");
    idMapper.set(3,"three");
    idMapper.set(4,"four");
    idMapper.set(5,"five");
    idMapper.set(6,"six");
    idMapper.set(7,"seven");
    idMapper.set(8,"eight");
    idMapper.set(9,"nine");
    idMapper.set(10,"ten");
    return idMapper.get(index);
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const [upcomingBookings, setUpcomingBookings] = useState<any>([]);
    const [completedBookings, setCompletedBookings] = useState<any>([]);
    const [cancelledBookings, setCancelledBookings] =  useState<any>([]);
    const [pendingBookings, setPendingBookings] =  useState<any>([]);

    function cancelTicket(id: any) {
        bookingDetailsService.update(id).then(res => console.log(res));
    }

    const [showFlightDetail, setShowFlightDetail] = useState<any>(false);
    let flight : any = {};
    const [currentFlight, setCurrentFlight] = useState(flight);
    const [showCancellationWarning, setShowCancellationWarning] = useState<any>(false)
    const [cancelledTicketIndex, setCancelledTicketIndex] = useState<any>(-1);
    const [showCancelSuccess, setShowCancelSuccess] = useState<any>(false);

    useEffect(()=> {
        // @ts-ignore
        BookingDetailsService.show("BOOKED").then((upcomingBooking) => setUpcomingBookings(upcomingBooking))
        // @ts-ignore
        BookingDetailsService.show("COMPLETED").then((completedBooking) => setCompletedBookings(completedBooking))
        // @ts-ignore
        BookingDetailsService.show("CANCELLED").then((cancelBooking) => setCancelledBookings(cancelBooking))
        // @ts-ignore
        BookingDetailsService.show("PENDING").then((pendingBooking) => setPendingBookings(pendingBooking))
    },[showCancelSuccess]);

    // @ts-ignore
    return (
        <div className="sm:container m-auto -mt-40 flex space-x-6">
            <div className="flex w-full flex-col space-y-2.5 pb-8">
                <div className="bg-white rounded-10">
                    <Box sx={{ width: '100%'}}>
                        <div className="flex pl-6">
                            <div className="my-auto text-xl pr-16 font-bold">My Bookings</div>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                    <Tab disabled={pendingBookings.length==0} label={"Pending ("+ pendingBookings.length +")"} {...a11yProps(0)} />
                                    <Tab disabled={upcomingBookings.length==0} label={"Upcoming ("+ upcomingBookings.length +")"} {...a11yProps(1)} />
                                    <Tab disabled={completedBookings.length==0} label={"Completed ("+ completedBookings.length +")"} {...a11yProps(2)} className=""/>
                                    <Tab disabled={cancelledBookings.length==0} label={"Cancelled ("+ cancelledBookings.length +")"} {...a11yProps(3)} />
                                </Tabs>
                            </Box>
                        </div>


                        <TabPanel value={value} index={0}>
                            <div className="px-6 pb-5 bg-white pt-2">
                                {
                                    pendingBookings?.map((booking: any, i:number) =>{
                                        return (
                                <div key={i} className={"border border-gray-300 rounded-lg my-10"}>
                                    <div className={"flex flex-row justify-around"}>
                                    <div className={"w-1/2"}>
                                   <div className={"flex flex-row justify-between p-5 font-bold"}>
                                       {/*<div>{booking?.journeyDetails[0]?.from} - {booking.journeyDetails[booking.journeyDetails.length-1]?.to}</div>*/}
                                       <div>Trip ID - {booking.tripId}</div>
                                   </div>

                                        <div className={"ts-flight-list bg-white py-1"}>
                                                            <div className="flex flex-col">
                                                                <div className="text-secondary pl-10">
                                                                    <FlightsUsed flight={booking.flightDetail}/>
                                                                </div>
                                                                <div className="pt-16">
                                                                    <TravelTimeline tr_path={booking.flightDetail}
                                                                                    selectedDate={moment(booking.departureDate)} />
                                                                </div>
                                                                <div className={"px-10 text-base text-gray-700 font-medium py-5 flex flex-row justify-between"}>
                                                                    <div className={"font-bold"}>{booking.flightDetail.number}</div>
                                                                    <div className={"font-bold"}>Economy</div>
                                                                    <div>Cabin - {booking.flightDetail.cabinBaggage}</div>
                                                                    <div>{booking.flightDetail.checkInBaggage}</div>
                                                                </div>
                                                            </div>
                                        </div>

                                    </div>
                                    <div className={"w-1/2 flex flex-row " }>
                                    <div className={"border-l my-5 border-gray-200"}></div>
                                        <div className={"p-5 w-full flex flex-col "}>

                                            <div className={"flex flex-row justify-between "}>
                                                <div>
                                                    <div className={"font-bold"}>
                                                        {moment(booking.departureDate).format("dddd, MMM Do, YYYY")}
                                                    </div>
                                                    <div className={"flex flex-row"}>
                                                        <div className={"py-1 flex "}>{booking.flightDetail.stops.length == 2 ? "2 Stops":booking.flightDetail.stops.length == 1 ? "1 Stops":"Non Stop"} . {booking.flightDetail.duration}</div>
                                                        <div className={"text-primary py-1 px-2 font-bold"} onClick={() => {
                                                            setShowFlightDetail(!showFlightDetail)
                                                                setCurrentFlight(booking.flightDetail)
                                                        }}>view itenary</div>
                                                    </div>
                                                </div>


                                                <div className={"pr-10 font-bold text-xl flex flex-col justify-center"}>
                                                    $ {booking.price}
                                                </div>
                                            </div>

                                            <div>
                                            <div className={"border-t border-gray-300 mt-14"}></div>
                                            <div className="grid grid-cols-4 py-3 font-bold text-gray-700 px-3">
                                                <div className="col-span-2">Traveller(s)</div>
                                                <div className="col-span-1">Seat</div>
                                                <div className="col-span-1">Class</div>
                                            </div>
                                            <div className={"border-t border-gray-300 mb-2 "}></div>
                                            {
                                                booking.passengerDetails?.map((passenger: any, k:number) =>{
                                                    return (

                                            <div key={k} className="grid grid-cols-4 py-3 text-gray-500 font-medium px-4">
                                                <div className="col-span-2">{passenger.firstName} {passenger.lastName}</div>
                                                <div className="col-span-1">{passenger.seatAllocated}</div>
                                                <div className="col-span-1">Economy</div>
                                            </div>
                                                    );
                                                })
                                            }
                                            <div className={"border-t border-gray-300 mt-2"}></div>
                                            </div>

                                            {<div className={"py-10"}>
                                                <div className={"flex flex-row justify-between"}>
                                                    <a href={"/"+booking.ticketURL}
                                                       download={booking.ticketURL}
                                                       className="text-primary font-bold"
                                                       id={'download-ticket-upcoming'+i}>Download Ticket</a>
                                                    <button
                                                        onClick={() => {
                                                            setShowCancellationWarning(!showCancellationWarning)
                                                                setCancelledTicketIndex(i)
                                                        }}
                                                        className={"bg-primary text-white p-2 px-8 font-bold rounded-md"}>Cancel
                                                        Ticket
                                                    </button>

                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                        );
                                    })
                                }
                            </div>
                        </TabPanel>




                        <TabPanel value={value} index={1}>
                            <div className="px-6 pb-5 bg-white pt-2">
                                {
                                    upcomingBookings?.map((booking: any, i:number) =>{
                                        return (
                                <div key={i} className={"border border-gray-300 rounded-lg my-10"}>
                                    <div className={"flex flex-row justify-around"}>
                                    <div className={"w-1/2"}>
                                   <div className={"flex flex-row justify-between p-5 font-bold"}>
                                       <div>{booking?.flightDetail.fromLocation} - {booking.flightDetail.toLocation}</div>
                                       <div>Trip ID - {booking.tripId}</div>
                                   </div>

                                        <div className={"ts-flight-list bg-white py-1"}>
                                                            <div className="flex flex-col">
                                                                <div className="text-secondary pl-10">
                                                                    <FlightsUsed flight={booking.flightDetail}/>
                                                                </div>
                                                                <div className="pt-16">
                                                                    <TravelTimeline tr_path={booking.flightDetail}
                                                                                    selectedDate={moment(booking.departureDate)} />
                                                                </div>
                                                                <div className={"px-10 text-base text-gray-700 font-medium py-5 flex flex-row justify-between"}>
                                                                    <div className={"font-bold"}>{booking.flightDetail.number}</div>
                                                                    <div className={"font-bold"}>Economy</div>
                                                                    <div>Cabin - {booking.flightDetail.cabinBaggage}</div>
                                                                    <div>{booking.flightDetail.checkInBaggage}</div>
                                                                </div>
                                                            </div>
                                        </div>

                                    </div>
                                    <div className={"w-1/2 flex flex-row " }>
                                    <div className={"border-l my-5 border-gray-300"}></div>
                                        <div className={"p-5 w-full flex flex-col "}>

                                            <div className={"flex flex-row justify-between "}>
                                                <div>
                                                    <div className={"font-bold"}>
                                                        {moment(booking.departureDate).format("dddd, MMM Do, YYYY")}
                                                    </div>
                                                    <div className={"flex flex-row"}>
                                                        <div className={"py-1 flex "}>{booking.flightDetail.stops.length == 2 ? "2 Stops":booking.flightDetail.stops.length == 1 ? "1 Stops":"Non Stop"} . {booking.flightDetail.duration}</div>
                                                        <div className={"text-primary py-1 px-2 font-bold"} onClick={() => {
                                                            setShowFlightDetail(!showFlightDetail)
                                                                setCurrentFlight(booking.flightDetail)
                                                        }}>view itenary</div>
                                                    </div>
                                                </div>


                                                <div className={"pr-10 font-bold text-xl flex flex-col justify-center"}>
                                                    $ {booking.price}
                                                </div>
                                            </div>

                                            <div>
                                            <div className={"border-t border-gray-300 mt-14"}></div>
                                            <div className="grid grid-cols-4 py-3 font-bold text-gray-700 px-3">
                                                <div className="col-span-2">Traveller(s)</div>
                                                <div className="col-span-1">Seat</div>
                                                <div className="col-span-1">Class</div>
                                            </div>
                                            <div className={"border-t border-gray-300  mb-2 "}></div>
                                            {
                                                booking.passengerDetails?.map((passenger: any, k:number) =>{
                                                    return (

                                            <div key={k} className="grid grid-cols-4 py-3 text-gray-500 font-medium px-4">
                                                <div className="col-span-2">{passenger.firstName} {passenger.lastName}</div>
                                                <div className="col-span-1">{passenger.seatAllocated}</div>
                                                <div className="col-span-1">Economy</div>
                                            </div>
                                                    );
                                                })
                                            }
                                            <div className={"border-t border-gray-300 mt-2"}></div>
                                            </div>

                                            {<div className={"py-10"}>
                                                <div className={"flex flex-row justify-between"}>
                                                    <a href={"/"+booking.ticketURL}
                                                       download={booking.ticketURL}
                                                       className="text-primary font-bold"
                                                       id={'download-ticket-upcoming'+i}>Download Ticket</a>
                                                    <button
                                                        onClick={() => {
                                                            setShowCancellationWarning(!showCancellationWarning)
                                                                setCancelledTicketIndex(i)
                                                        }}
                                                        className={"bg-primary text-white p-2 px-8 font-bold rounded-md"}>Cancel
                                                        Ticket
                                                    </button>

                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                        );
                                    })
                                }
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <div className="px-6 pb-5 bg-white pt-2">
                                {
                                    completedBookings?.map((booking: any, i:number) =>{
                                        return (
                                            <div key={i} className={"border border-gray-300 rounded-lg my-10"}>
                                                <div className={"flex flex-row justify-around"}>
                                                    <div className={"w-1/2"}>
                                                        <div className={"flex flex-row justify-between p-5 font-bold"}>
                                                            <div>{booking?.flightDetail.fromLocation} - {booking.flightDetail.toLocation}</div>
                                                            <div>Trip ID - {booking.tripId}</div>
                                                        </div>
                                                        <div className={"ts-flight-list bg-white py-1"}>
                                                            <div className="flex flex-col">
                                                                <div className="text-secondary pl-10">
                                                                    <FlightsUsed flight={booking.flightDetail}/>
                                                                </div>
                                                                <div className="pt-16">
                                                                    <TravelTimeline tr_path={booking.flightDetail}
                                                                                    selectedDate={moment(booking.departureDate)} />
                                                                </div>
                                                                <div className={"px-10 text-base text-gray-700 font-medium py-5 flex flex-row justify-between"}>
                                                                    <div className={"font-bold"}>{booking.flightDetail.number}</div>
                                                                    <div className={"font-bold"}>Economy</div>
                                                                    <div>Cabin - {booking.flightDetail.cabinBaggage}</div>
                                                                    <div>{booking.flightDetail.checkInBaggage}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className={"w-1/2 flex flex-row " }>
                                                        <div className={"border-l my-5 border-gray-300"}></div>
                                                        <div className={"p-5 w-full flex flex-col "}>

                                                            <div className={"flex flex-row justify-between "}>
                                                                <div>
                                                                    <div className={"font-bold"}>
                                                                        {moment(booking.departureDate).format("dddd, MMM Do, YYYY")}
                                                                    </div>
                                                                    <div className={"flex flex-row"}>
                                                                        <div className={"py-1 flex "}>{booking.flightDetail.stops.length == 2 ? "2 Stops":booking.flightDetail.stops.length == 1 ? "1 Stops":"Non Stop"} . {booking.flightDetail.duration}</div>
                                                                        <div className={"text-primary py-1 px-2 font-bold"} onClick={() => {
                                                                            setShowFlightDetail(!showFlightDetail)
                                                                            setCurrentFlight(booking.flightDetail)
                                                                        }}>view itenary</div>
                                                                    </div>
                                                                </div>


                                                                <div className={"pr-10 font-bold text-xl flex flex-col justify-center"}>
                                                                    $ {booking.price}
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className={"border-t border-gray-300 mt-14"}></div>
                                                                <div className="grid grid-cols-4 py-3 font-bold text-gray-700 px-3">
                                                                    <div className="col-span-2">Traveller(s)</div>
                                                                    <div className="col-span-1">Seat</div>
                                                                    <div className="col-span-1">Class</div>
                                                                </div>
                                                                <div className={"border-t border-gray-300 mb-2 "}></div>
                                                                {
                                                                    booking.passengerDetails?.map((passenger: any, k:number) =>{
                                                                        return (

                                                                            <div key={k} className="grid grid-cols-4 py-3 text-gray-500 font-medium px-4">
                                                                                <div className="col-span-2">{passenger.firstName} {passenger.lastName}</div>
                                                                                <div className="col-span-1">{passenger.seatAllocated}</div>
                                                                                <div className="col-span-1">Economy</div>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                                <div className={"border-t border-gray-300 mt-2"}></div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <div className="px-6 pb-5 bg-white pt-2">
                                {
                                    cancelledBookings?.map((booking: any, i:number) =>{
                                        return (
                                            <div key={i} className={"border border-gray-300 rounded-lg my-10"}>
                                                <div className="absolute translate-y-1/2 pl-20 translate-x-full z-10">
                                                    <ImageWithAssetPrefix height={180} width={284} src={assetPrefix+"/cancelled-stamp.svg"} alt=""/>
                                                </div>
                                                <div className={"flex flex-row justify-around"}>
                                                    <div className={"w-1/2"}>
                                                        <div className={"flex flex-row justify-between p-5 font-bold"}>
                                                            <div>{booking?.flightDetail.fromLocation} - {booking.flightDetail.toLocation}</div>
                                                            <div>Trip ID - {booking.tripId}</div>
                                                        </div>

                                                        <div className={"ts-flight-list bg-white py-1"}>
                                                            <div className="flex flex-col">
                                                                <div className="text-secondary pl-10">
                                                                    <FlightsUsed flight={booking.flightDetail}/>
                                                                </div>
                                                                <div className="pt-16">
                                                                    <TravelTimeline tr_path={booking.flightDetail}
                                                                                    selectedDate={moment(booking.departureDate)} />
                                                                </div>
                                                                <div className={"px-10 text-base text-gray-700 font-medium py-5 flex flex-row justify-between"}>
                                                                    <div className={"font-bold"}>{booking.flightDetail.number}</div>
                                                                    <div className={"font-bold"}>Economy</div>
                                                                    <div>Cabin - {booking.flightDetail.cabinBaggage}</div>
                                                                    <div>{booking.flightDetail.checkInBaggage}</div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className={"w-1/2 flex flex-row " }>
                                                        <div className={"border-l my-5 border-gray-300"}></div>
                                                        <div className={"p-5 w-full flex flex-col "}>

                                                            <div className={"flex flex-row justify-between "}>
                                                                <div>
                                                                    <div className={"font-bold"}>
                                                                        {moment(booking.departureDate).format("dddd, MMM Do, YYYY")}
                                                                    </div>
                                                                    <div className={"flex flex-row"}>
                                                                        <div className={"py-1 flex "}>{booking.flightDetail.stops.length == 2 ? "2 Stops":booking.flightDetail.stops.length == 1 ? "1 Stops":"Non Stop"} . {booking.flightDetail.duration}</div>
                                                                        <div className={"text-primary py-1 px-2 font-bold"} onClick={() => {
                                                                            setShowFlightDetail(!showFlightDetail)
                                                                            setCurrentFlight(booking.flightDetail)
                                                                        }}>view itenary</div>
                                                                    </div>
                                                                </div>


                                                                <div className={"pr-10 font-bold text-xl flex flex-col justify-center"}>
                                                                    <div className={"flex flex-row"}>
                                                                    <div className={"text-lg text-green-600"}>Refundable Amount - </div>
                                                                    <div className={"pl-1"}>$ {booking.price}</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <div className={"border-t border-gray-300 mt-14"}></div>
                                                                <div className="grid grid-cols-4 py-3 font-bold text-gray-700 px-3">
                                                                    <div className="col-span-2">Traveller(s)</div>
                                                                    <div className="col-span-1">Seat</div>
                                                                    <div className="col-span-1">Class</div>
                                                                </div>
                                                                <div className={"border-t border-gray-300 mb-2 "}></div>
                                                                {
                                                                    booking.passengerDetails?.map((passenger: any, k:number) =>{
                                                                        return (

                                                                            <div key={k} className="grid grid-cols-4 py-3 text-gray-500 font-medium px-4">
                                                                                <div className="col-span-2">{passenger.firstName} {passenger.lastName}</div>
                                                                                <div className="col-span-1">{passenger.seatAllocated}</div>
                                                                                <div className="col-span-1">Economy</div>
                                                                            </div>
                                                                        );
                                                                    })
                                                                }
                                                                <div className={"border-t border-gray-300 mt-2"}></div>
                                                            </div>

                                                            {<div className={"py-10"}>
                                                                <div className={"flex flex-row justify-between"}>
                                                                    <button disabled={true}
                                                                       className="text-gray-400 font-bold cursor-not-allowed"
                                                                       id={'download-ticket-upcoming'+i}>Download Ticket</button>

                                                                </div>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </TabPanel>
                    </Box>
                </div>
            </div>
            <Modal open={showFlightDetail}>
                <Itenary onClose={()=> {
                    setShowFlightDetail(false);
                    return {};
                }} flight={currentFlight}/>
            </Modal>
            <Modal open={showCancellationWarning}>
                <div className="w-full h-full flex">
                    <div className="bg-white py-6 px-6 outline-none rounded-10 m-auto">
                        <div className="text-base font-semi-bold px-12 py-8 m-auto bg-white flex flex-col text-center text-secondary">
                            {!showCancelSuccess && <>
                            Do you want to cancel your<br/>
                            {upcomingBookings[cancelledTicketIndex]?.flightDetail.fromLocation} - {upcomingBookings[cancelledTicketIndex]?.flightDetail.toLocation} Trip?
                            <button className="ts-t-primary-btn my-6 w-fit px-8 mx-auto"
                                    onClick={()=>{setShowCancelSuccess(true);cancelTicket(upcomingBookings[cancelledTicketIndex]?.id)}}>Yes, Cancel</button>
                            <a onClick={() =>{setShowCancellationWarning(false)}} className="cursor-pointer"> No, Go Back </a>
                            </>}
                            {showCancelSuccess && <>
                                {upcomingBookings[cancelledTicketIndex]?.flightDetail.fromLocation} - {upcomingBookings[cancelledTicketIndex]?.flightDetail.toLocation} Trip <br/>
                                Cancelled Successfully.
                                <button className="ts-t-primary-btn my-6 w-fit px-8 mx-auto"
                                        onClick={()=>{setShowCancellationWarning(false);setShowCancelSuccess(false);}}>Done</button>
                            </>}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
