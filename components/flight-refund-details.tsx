import React, {ForwardedRef, useState} from "react";
import FlightDetail from "./flight-detail";
import {FlightRefundDetail} from "../interfaces/flight-refund-detail";
import {assetPrefix} from "../next.config";
import ImageWithAssetPrefix from "./image/image";

const FlightAndRefundDetail = (props:FlightRefundDetail,ref:ForwardedRef<any>)=>{
    let [detailsType,setDetailsType] = useState(1);
    return <span className="h-auto max-h-128 overflow-y-auto  translate-y-20 translate-x-2/4 absolute bg-white w-1/2 bg-white py-6 px-6 outline-none rounded-10 overflow-hidden space-y-5" ref={ref}>
      <div className="flex items-center justify-between">
          <span className="space-x-5">
              <button className={`py-2 px-4 text-base font-medium rounded-5 ${detailsType==1?'bg-primary text-white':'bg-grey-secondary'}`} onClick={()=>{setDetailsType(1)}} id={'flight-details'}>Flight details</button>
              <button className={`py-2 px-4 text-base font-medium rounded-5 ${detailsType==2?'bg-primary text-white':'bg-grey-secondary'}`} onClick={()=>{setDetailsType(2)}} id={'cancellation-refund-details'}>Cancellation / Refund Details</button>
          </span>
          <span>
              <ImageWithAssetPrefix height={14} width={14} src={assetPrefix+"/close-icon.svg"}
                                    alt="" className="cursor-pointer" onClick={props.onClose} id={'close-icon'}/>
          </span>
      </div>
        <div className={"overflow-y-auto"}>
      <FlightDetail className="max-h-96 overflow-y-auto" showRefundDetails={detailsType==2} isFlightListItemDetail={true} flight={props.flight}/>
            </div>
  </span>
}

export default React.forwardRef(FlightAndRefundDetail);
