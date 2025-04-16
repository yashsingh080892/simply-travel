import React, {useEffect, useState} from "react";
import data from "../../public/data.json";
import styles from "./index.module.scss";
import {FlightListDropdownProps} from "../../interfaces/flight-list-dropdown-props";
import {FlightListDropdownHeading} from "../../interfaces/flight-list-dropdown-heading";
import {CityDetails} from "../../interfaces/city-details";
import { assetPrefix } from "../../next.config";
import ImageWithAssetPrefix from "../image/image";
import {Cities} from "../../models/cities.model";
import CitiesService from "../../services/cities.service";


const ListHeading = (props:FlightListDropdownHeading) => {
    return <div className="font-bold text-secondary text-base border-b py-0.5 pb-1.5">{props.heading}</div>
};


const CityListItem = ( props: CityDetails) => {
    const onClick = (event:any) => {
        props.onSelect({
            cn_name : props.cnName,
            ct_name : props.ctName,
            ap_name : props.apName,
            // @ts-ignore
            index : props.index,
            host_airlines: props.hostAirlines,
            offset_time: props.offsetTime,
            ct_id: props.ctId,
        });
        // @ts-ignore
        props.handleClose(event);
    };
    return <div className={`flex items-center cursor-pointer ${styles.list_item}`} onClick={onClick} id={'city-'+props.ctId}>
        <div className="basis-2/12">
            <ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/home/flight.svg"} className="mx-auto" alt=""/>
        </div>
        <div className="flex flex-col basis-10/12">
            <span className="text-base text-secondary font-bold py-px">{props.ctName}</span>
            <span className="text-sm text-grey font-normal py-px">{props.apName}</span>
        </div>
    </div>
};

const FlightListDropDown = (props:FlightListDropdownProps) => {

    const [searchQuery, setSearchQuery] = useState("")

    const [filteredCities, setFilteredCities] = useState(data.cities.filter(city => (city.ct_name.toLowerCase().includes(searchQuery.toLowerCase()) && props.excludedCity?.ap_name != city.ap_name)));


    const [cities, setCities] = useState<Cities[]>([]);
    const [search,setSearch]=useState<any>("");



     useEffect(()=>{

             CitiesService.searchCity(search || "",props.excludedCity?.ct_id || "").then((cities)=>setCities(cities)).catch(()=>{
                 console.error("Error while Searching cities")
             })

     },[search,props.excludedCity?.ct_id])

console.log(props.excludedCity?.ct_id);

    return(
        <React.Fragment>
            <div className="pt-5 pb-2.5 px-5 sticky top-0 bg-white">
                <input className="py-2 px-5 rounded-md border border-gey w-full" placeholder="Search" id={'search-flights'} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className="px-5 pb-5 space-y-4 max-h-72 w-72 overflow-hidden overflow-y-auto">
                {search.length ==0 && <ListHeading heading={"Popular Cities"} />}
                {
                    filteredCities?.length != 0 ?
                        cities?.map((city,key)=>{
                            // @ts-ignore
                            return <CityListItem onSelect={props.onSelect} index={props.index} key={key}
                                                 ctName={city.name}
                                                 cnName={city.countryName}
                                                 hostAirlines={["UA", "AA"]}
                                                 offsetTime={ "02:00"}
                                                 ctId={city.id}
                                                 handleClose={props.handleClose} apName={city.airportName}/>
                        }):
                        <div className="text-secondary pt-1">The Searched City unavailable</div>
                }
            </div>
        </React.Fragment>
    );
}

export default FlightListDropDown;
