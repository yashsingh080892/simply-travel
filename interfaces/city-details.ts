export interface CityDetails {
    ctName: string, index:number,cnName:string,apName:string,
    hostAirlines: string[], offsetTime:string, ctId: number,
    onSelect:({}:{cn_name:string, ct_name:string, ap_name: string})=>{},handleClose:()=>{}
}