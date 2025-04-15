import {TripDetail} from "../redux/reducers/trip";

export interface FlightListProps {
        tripDetails?: TripDetail[];
        from?:string,
        to?:string ,
        setSelectedFlightDetails:({})=>void,
        sortBy:(sortedColumn: string)=>void,
        flightArray: any,
        sortedByColumn: string,
        isAscending: boolean,
        selectedDate: any,
}