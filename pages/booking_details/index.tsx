import React, {useEffect, useState} from "react";
import FlightDetail from "../../components/flight-detail";
import FareSummary from "../../components/fare-summary";
import Accordion from "../../components/accordion";
import {connect} from "react-redux";
import data from "../../public/data.json";
import {bookingDetailsProperties} from "../../interfaces/booking-details-props";
import {Store} from "../../redux/store";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../../components/image/image";
import JsonData from "../../public/data.json";
import BookingDetailsService from "../../services/booking-details.service";
import {useRouter} from "next/router";

const BookingDetails = (props:bookingDetailsProperties) => {

    const passengersList = [...props?.adult,...props?.children,...props?.infants];
    let trips = props.selectedFlightDetail?.trips || [];
    let cities: any = JsonData.cities;
    let travellers: {name: string, seat: string, class: string}[] = [];
    let flights: {}[] = [];
    passengersList.forEach((passenger:any, i: number)=> {
        travellers.push({name:(passenger.firstName + " " + passenger.lastName),seat: props.selectedSeats[i], class: "Economy"});
    })
    // props.selectedFlightDetail?.flightData.flight_ids?.forEach( (flightId:string) =>{
    //     flights.push({airlines:props.selectedFlightDetail?.flightData?.name, flightId: flightId, logoUrl: props.selectedFlightDetail?.flightData["logo-url"]});
    // })
    // let ticketDetails = {
    //     title: cities.find((city:any) => city.ct_id == trips[0]?.tr_path[0].ct_id)?.ct_name + " - " + cities.find((city:any) => city.ct_id == trips[0]?.tr_path[(trips[0].tr_path.length) -1].ct_id)?.ct_name,
    //     tripID: "ST24358798567",
    //     flightData: props.selectedFlightDetail?.flightData,
    //     date: moment().format("dddd, MMMM Do, YYYY"),
    //     price: props.selectedFlightDetail?.ph_price,
    //     travellers: travellers,
    //     flights: [{flightId: props.selectedFlightDetail?.f_id, airlines: props.selectedFlightDetail?.flightData.name, logoUrl: props.selectedFlightDetail?.flightData["logo-url"]}],
    //     tt: props.selectedFlightDetail?.tt,
    //     stops: props.selectedFlightDetail?.stops == 0 ? "Non Stop" : (props.selectedFlightDetail?.stops == 1? "1 Stop":"2 Stops"),
    //     ticketURL: "Ticket_PDF_Trip_1.pdf",
    //     trips: trips
    // };

    useEffect(()=>{
        if(sessionStorage?.getItem("ticketSet") !='true') {
            // @ts-ignore
            let bookedTicketsArray = sessionStorage?.getItem("bookedTicketsArray")?  JSON.parse(sessionStorage.getItem("bookedTicketsArray")) : [];
            // bookedTicketsArray.push({...ticketDetails, id: bookedTicketsArray.length});
            sessionStorage?.setItem("bookedTicketsArray", JSON.stringify(bookedTicketsArray));
        }
        sessionStorage?.setItem("ticketSet",
            sessionStorage?.getItem("ticketSet") != 'true'? "true": "false");
    }, []);


    const [bookingDetail,setBookingDetail] = useState<any>()
    const router = useRouter();

    useEffect(() => {
        const id:any = router.query.id; // retrieve id from query
        if (id) {
            BookingDetailsService.showById(id).then((booking:any) => {
                    setBookingDetail(booking)
                    console.log(bookingDetail)
                }
            );
        }
    }, [router.query.id]);

    return (
        <div className="sm:container m-auto -mt-40 flex space-x-6">
            <div className="flex basis-4/5 flex-col space-y-2.5 pb-8">
                <div className="bg-white rounded-10 px-8 py-8">
                    <div className="flex justify-between">
                        <div className="flex flex-col space-y-2">
                            <div className="flex space-x-3 align-center">
                                <div className="text-2xl font-bold text-secondary pr-3">Ticket Booked Successfully</div>
                                <ImageWithAssetPrefix height={24} width={24} src={assetPrefix+"/home/tick.svg"} alt=""/>
                            </div>
                            <div className="text-base ">
                                <span className="text-secondary font-normal">All details has been sent to </span><span className="text-ts-green font-bold">{bookingDetail?.email}</span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="text-lg font-bold text-secondary self-end">Trip ID - ST24358798567</div>
                            <a href={"/Ticket_PDF_Trip_1.pdf"}
                               download={"Ticket_PDF_Trip_1.pdf"}
                               className="text-base font-bold text-primary self-end"
                               id={"download-booking-ticket"}
                            >
                                Download Ticket
                            </a>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ImageWithAssetPrefix height={280} width={280} src={assetPrefix+"/home/success.svg"} alt="" className="m-auto"/>
                    </div>
                    <div>
                        <div className="flex justify-between text-base font-bold text-secondary py-3 border-t border-b border-grey-secondary">
                            <span className="basis-3/12">Traveller(s)</span>
                            <span className="basis-3/12">Gender</span>
                            <span className="basis-3/12">Seat</span>
                            <span className="basis-3/12">Class</span>
                        </div>
                        {
                            bookingDetail?.passengerDetails.map((passenger: any,index:number)=>{
                                let seatNo = props.selectedSeats?.[index];
                                return <div key={index} className={`flex justify-between text-base font-normal text-secondary py-3${passengersList.length-1===index ? ' border-b border-grey-secondary':''}`}>
                                    <span className="basis-3/12">{passenger.firstName} {passenger.lastName}</span>
                                    <span className="basis-3/12">{passenger.gender}</span>
                                    <span className="basis-3/12">{passenger.seatAllocated}</span>
                                    <span className="basis-3/12">{props.classType}</span>
                                </div>
                            })
                        }
                    </div>
                    <div className="text-base font-normal text-secondary py-3">Thank you for booking with SimplyTravel. Use the above Trip ID in all communications with SimplyTravel.</div>
                </div>
                {
                    bookingDetail && <div className="bg-white rounded-10">
                        <Accordion
                            defaultOpen={true}
                            hideBorder={true}
                            items={[{
                                HeaderPortion: (<div className="text-lg font-bold">Your Flight Details</div>),
                                Content:
                                    (
                                            <div className="px-6 pb-6">
                                                     <FlightDetail flight={bookingDetail?.flightDetail}/>
                                            </div>
                                    )
                            }]}
                        />
                    </div>
                }
            </div>
            <div className="flex basis-1/5 flex-col">
                <div className="sticky top-10 space-y-6">
                    <FareSummary
                        discount={true}
                        baseFare={Number(props.selectedFlightDetail?.ph_price||500)}
                        adultCount={props.adultCount}
                        childrenCount={props.childrenCount}
                        infantsCount={props.infantsCount}
                        addonsAmount={props.addonsAmount}
                    />
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: Store):bookingDetailsProperties => {
    const passengersDetail = state.passengersDetail;
    const trip = state?.trip;
    const passengersAndClass = trip?.passengersAndClass;
    const adultCount = passengersAndClass.adult||0;
    const childrenCount = passengersAndClass.children||0;
    const infantsCount = passengersAndClass.infants||0;
    const classType = data.classes.filter((classData)=>{ return classData.id === trip?.passengersAndClass?.classType })?.[0]?.name||'Economy';
    const addons = passengersDetail?.addons;
    const addonsAmount = ( addons.covidInsurance.status ? addons.covidInsurance.amount : 0 )+( addons.packageProtection.status ? addons.packageProtection.amount : 0 )+( addons.covidTest.status ? addons.covidTest.amount : 0 );
    return {
        adult : passengersDetail.adult,
        children : passengersDetail.children,
        infants : passengersDetail.infants,
        contactDetails : passengersDetail.contactDetails,
        selectedFlightDetail : state.flightDetail?.selectedFlightDetail,
        selectedSeats : passengersDetail.selectedSeats,
        classType,
        adultCount,
        childrenCount,
        infantsCount,
        addonsAmount
    }
};


// @ts-ignore
export default connect<bookingDetailsProperties>(mapStateToProps,null)(BookingDetails);
