import React, {useEffect} from "react";
import RadioGroup from "../radio-button-group";
import DropDown from "../dropdown";
import FlightListDropDown from "../flight-list-dropdown";
import getCurrentDateDetails from "../../utils/dateFormater";
import PassengersAndClassForm from "../passengers-classes";
import {connect} from "react-redux";
import {
    addNewTrip, removeLastTrip,
    setDeparture,
    setPassengersAndClass, setReturnDate,
    setTripFrom,
    setTripTo,
    setTripType, toggleFromToLocations
} from "../../redux/actions/tripActions";
import classNames from "classnames";
import DatePicker from "../date-picker";
import data from "../../public/data.json";
import Router, {useRouter} from "next/router";
import {FlightSearchProps} from "../../interfaces/flight-search-props";
import {FlightTriggerProps} from "../../interfaces/flight-trigger";
import {HeaderLabelProps} from "../../interfaces/header-label-props";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../image/image";

const SelectPlace = (props:any) => {
    return <div className="h-full flex items-center justify-center" >
        <span className="text-2xl text-secondary font-bold">{props.content}</span>
    </div>
};

const FlightTrigger = (props:FlightTriggerProps)=>{
    return <React.Fragment>
        <div className={"text-2xl truncate ct_name leading-7 pr-4 font-bold"}>{props.cityName}</div>
        <div className={"text-base truncate ap-name leading-4 pr-4 pt-1 font-normal"}>{props.airportName}</div>
    </React.Fragment>
};

const HeaderLabel = (props:HeaderLabelProps) => {
    return <div className={`text-lg font-bold text-secondary pb-1.5${props.className?` ${props.className}`:''}`}>{props.content}</div>
};

const FlightSearch = (props: FlightSearchProps) => {
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

  const [myFlightData, setMyFlightData]= React.useState<{}>({
    tripTypes: [],
    tripType: "",
    cities:[],
    from: {"ct_name":"","ap_name":"", "host_airlines":[""]},
    to: {"ct_name":"","ap_name":"", "host_airlines":[""]},
    departure: getCurrentDateDetails(),
    return: "",
    passengers:3,
    class:"Economy"
  });
    let  getData = () =>{
        setMyFlightData({...myFlightData,
            tripTypes: data.tripTypes,
            tripType: data.tripTypes[0],
            from: {"ct_name": data.cities[0]["ct_name"],"ap_name":data.cities[0]["ap_name"], "host_airlines":data.cities[0]["host_airlines"],"ct_id":data.cities[0]["ct_id"]},
            to: {"ct_name": data.cities[1]["ct_name"],"ap_name":data.cities[1]["ap_name"], "host_airlines":data.cities[1]["host_airlines"],"ct_id":data.cities[1]["ct_id"]}
        });
    }
    useEffect(()=>{
        getData();
    }, []);

    const passengersCount = props.passengersAndClass.adult+props.passengersAndClass.children+props.passengersAndClass.infants;
    const classType =  data.classes.find((_class)=> {
        return _class.id === props.passengersAndClass.classType
    })?.name;

    let isPlacesNotSelected = false;
    for( let i=0 ; i<props.tripDetails.length ; i++ ){
        const trip = props.tripDetails[i];
        console.log(trip);
        if( !trip?.from || !trip?.to ){
            isPlacesNotSelected = true;
            break;
        }
    }

    const { asPath } = useRouter();
    // @ts-ignore
    useEffect((value)=>{
        if(asPath.endsWith('home')){
            Router.push({pathname: "../"});
        }
    },[props.type]);
    function handleTripValueChange(value: string) {
        props.setTripType(value);
    }

    const isV2Route = asPath.endsWith('v2');
    return (
        <>
            { !isV2Route &&
            <div>
        <div className={"bg-white ts-t-flight-radio-group-container w-fit"}>
            <RadioGroup radioGroupName="tripTypes" options={data.tripTypes} value={props.type}
                        onValueChange={(value: string) => handleTripValueChange(value)} className={'py-1 mb-1 !text-lg'}
                        key="1"></RadioGroup>
        </div>
        <div className="ts-t-search-tabs bg-white w-full relative space-y-6">
            {
                props.tripDetails.map((trip, index) => {
                    return <div className={"flex flex-wrap"} key={index}>
                        <HeaderLabel content={"From"} className={props.type != 3 ? "w-1/5" : "w-1/4"}/>
                        <HeaderLabel content={"To"}
                                     className={`${(trip.to && props.type != 3) && '!pl-8'}${props.type != 3 ? " w-1/5" : " w-1/4"}`}/>
                        <HeaderLabel content={"Departure"} className={props.type != 3 ? "w-1/5" : "w-1/4"}/>
                        {
                            props.type != 3 && <HeaderLabel content={"Return"} className={"w-1/5"}/>
                        }
                        {
                            index === 0 ? <HeaderLabel content={"Passengers & Class"} className={"w-1/5"}/> : null
                        }
                        <div className={"flex w-full ts-t-filter-box"}>
                            {
                                // @ts-ignore
                                <DropDown
                                    idName={'from-route-'+id(index+1)}
                                    className={`${props.type != 3 ? 'w-1/5' : 'w-1/4'} text-secondary cursor-pointer`}
                                    trigger={
                                        trip.from ? <FlightTrigger cityName={trip.from?.ct_name}
                                                                   airportName={trip.from?.ap_name}/> :
                                            <SelectPlace content="Select From"/>
                                    }
                                    content={
                                        // @ts-ignore
                                        <FlightListDropDown onSelect={props.setTripFrom} index={index}
                                                            excludedCity={{}}/>
                                    }
                                />
                            }
                            {
                                props.type != 3 ? <div className={"w-0 border-0"}>
                                    <div onClick={props.toggleFromToLocations}
                                         className="ts-toggle-button absolute hover:bg-grey-secondary cursor-pointer" id="toggle"></div>
                                </div> : null
                            }
                            {
                                // @ts-ignore
                                <DropDown
                                    idName={'to-route-'+id(index+1)}
                                    className={classNames("cursor-pointer", {"!pl-8": (trip.to && props.type != 3)}, {"w-1/5": props.type != 3}, {"w-1/4": props.type == 3})}
                                    trigger={
                                        trip.to ? <FlightTrigger cityName={trip.to?.ct_name}
                                                                 airportName={trip.to?.ap_name}/> :
                                            <SelectPlace content="Select To"/>
                                    }
                                    content={
                                        // @ts-ignore
                                        <FlightListDropDown onSelect={props.setTripTo} index={index}
                                                            excludedCity={props.from}/>
                                    }


                                />
                            }
                            {
                                // @ts-ignore
                                <DropDown
                                    idName={'depart-route-'+id(index+1)}
                                    className={`${props.type != 3 ? 'w-1/5' : 'w-1/4'} text-secondary cursor-pointer`}
                                    trigger={
                                        trip?.depart ? <React.Fragment>
                                            <div>
                                                    <span
                                                        className="text-2xl font-bold">{`${trip?.depart?.month} ${trip?.depart?.date},`}</span>
                                                <span
                                                    className="text-base font-normal pl-2">{trip?.depart?.year}</span>
                                            </div>
                                            <div className="text-base font-normal">{trip?.depart?.day}</div>
                                        </React.Fragment> : <SelectPlace content="Select Departure Date"/>
                                    }
                                    content={
                                        // @ts-ignore
                                        <DatePicker value={trip?.depart?.data} index={index}
                                                    onChange={props.setDeparture}/>
                                    }></DropDown>
                            }
                            {
                                // @ts-ignore
                                props.type != 3 ? props.type == 2 ? <DropDown
                                    idName={'return-route-'+id(index+1)}
                                    className={`w-1/5 text-secondary cursor-pointer`}
                                    trigger={
                                        trip?.return ?
                                            <React.Fragment>
                                                <div >
                                                    <span
                                                        className="text-2xl font-bold">{`${trip?.return?.month} ${trip?.return?.date},`}</span>
                                                    <span
                                                        className="text-base font-normal pl-2">{trip?.return?.year}</span>
                                                </div>
                                                <div className="text-base font-normal">{trip?.return?.day}</div>
                                            </React.Fragment> : <SelectPlace content="Select Return Date"/>
                                    }
                                    content={
                                        // @ts-ignore
                                        <DatePicker value={trip?.return?.data} index={index}
                                                    minDate={trip?.depart?.data} onChange={props.setReturnDate}/>
                                    }></DropDown> : <div className="w-1/5" >
                                    <SelectPlace content="For Return Trip"/>
                                </div> : null
                            }
                            {
                                index === 0 ? <DropDown
                                    className={`${props.type != 3 ? 'w-1/5' : 'w-1/4'} text-secondary cursor-pointer`}
                                    idName={'traveller-route-'+id(index+1)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    trigger={
                                        <React.Fragment>
                                            <div
                                                className="text-2xl font-bold">{`${passengersCount} ${passengersCount > 1 ? 'Travellers' : 'Traveller'}`}</div>
                                            <div className="text-base font-normal">{classType}</div>
                                        </React.Fragment>
                                    }
                                    content={
                                        // @ts-ignore
                                        <PassengersAndClassForm passengersAndClass={props.passengersAndClass}
                                                                onSave={props.setPassengersAndClass}/>
                                    }
                                /> : (index == (props.tripDetails.length - 1)) ? <React.Fragment>
                                    <div className="w-1/4 flex !p-0 h-full">
                                        <div className="w-3/4 flex items-center justify-center">
                                            <button
                                                className="py-1.5 px-5 rounded-10 border border-primary text-lg font-bold text-primary hover:bg-primary hover:text-white"
                                                onClick={props.addNewTrip} id={'anothercity'}>+ Add another city
                                            </button>
                                        </div>
                                        <div
                                            className="w-1/4 flex justify-around border-l-[0.5px] border-[rgba(0, 0, 0, 0.2)]">
                                            <ImageWithAssetPrefix height={16} width={16}
                                                                  src={assetPrefix + "/home/close.svg"}
                                                                  alt="" className="w-4 cursor-pointer"
                                                                  onClick={props.removeLastTrip}
                                                                  id={'closeSvg'}/>
                                        </div>
                                    </div>
                                </React.Fragment> : <div className="w-1/4"></div>
                            }
                        </div>
                    </div>
                })
            }
            <div className={"w-full absolute ts-t-bottom-half-extension flex translate-y-1/2 !mt-0"}>
                <button onClick={() => {
                    Router.push({pathname: "/home"})
                }} disabled={isPlacesNotSelected} id="old-btn"
                        className={"ts-t-primary-btn text-lg font-bold w-fit px-10 mx-auto disabled:cursor-not-allowed"}>Search
                    Flights
                </button>
            </div>
        </div>
    </div>
            }
        </>
    )
}

const mapStateToProps = (state:any) => {
    const trip = state?.trip||{};
    const tripDetails = trip?.tripDetails;
    const currentTripData = tripDetails?.[0]||{};
    console.log(trip);
    return {
        from : currentTripData?.from,
        to : currentTripData?.to,
        depart : currentTripData?.depart,
        return : currentTripData?.return,
        passengersAndClass : trip?.passengersAndClass,
        type : trip?.type,
        tripDetails
    };
};

const mapDispatchToProps = {
    setTripFrom,
    setTripTo,
    setDeparture,
    setReturnDate,
    setPassengersAndClass,
    setTripType,
    addNewTrip,
    removeLastTrip,
    toggleFromToLocations
};

// @ts-ignore
export default connect(mapStateToProps,mapDispatchToProps)(FlightSearch);
