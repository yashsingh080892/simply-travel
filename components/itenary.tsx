import React, {ForwardedRef, useState} from "react";
import FlightDetail from "./flight-detail";
import {FlightRefundDetail} from "../interfaces/flight-refund-detail";
import {assetPrefix} from "../next.config";
import ImageWithAssetPrefix from "./image/image";

const Itenary = (props:FlightRefundDetail,ref:ForwardedRef<any>)=>{
    return <span className="translate-y-2/4 translate-x-2/4 absolute bg-white w-1/2 bg-white py-6 px-6 outline-none rounded-10 overflow-hidden space-y-5" ref={ref}>
      <div className="flex items-center justify-between">
          <span className="space-x-5 text-lg font-bold">
              Itenary
          </span>
          <span>
              <ImageWithAssetPrefix height={14} width={14} src={assetPrefix+"/close-icon.svg"}
                                    alt="" className="cursor-pointer" onClick={props.onClose} id={"close-svg"} />
          </span>
      </div>
      <FlightDetail className="max-h-96 overflow-y-auto" flight={props.flight} />
  </span>
}

export default React.forwardRef(Itenary);