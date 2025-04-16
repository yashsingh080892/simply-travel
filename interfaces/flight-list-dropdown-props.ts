export interface FlightListDropdownProps {
    onSelect : ({}:{ct_name:string, ap_name: string,index:number,
        host_airlines: string[],offset_time:string, ct_id: string})=>{};
    handleClose : ()=>{},
    index : number,
    excludedCity: any,
    id?: any,
};
