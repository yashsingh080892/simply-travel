export interface FlightSearchProps{
    setTripType: (value:string|number)=>{};
    return?: {
        month?:string,
        date?:string,
        day?:string,
        year?:string
    };
    passengersAndClass: any;
    depart?: {
        month?:string,
        date?:string,
        day?:string,
        year?:string
    };
    from: { ct_name:string, ap_name:string, host_airlines:string[],ct_id:number}|null,
    to: { ct_name:string, ap_name:string, host_airlines:string[] ,ct_id:number}|null,
    setTripFrom : ()=>{},
    setTripTo : ()=>{},
    setDeparture : ()=>{},
    setReturnDate : ()=>{},
    setPassengersAndClass : ()=>{},
    addNewTrip:()=>{},
    removeLastTrip:()=>{},
    toggleFromToLocations : ()=>void,
    type : number,
    tripDetails : any[]
}