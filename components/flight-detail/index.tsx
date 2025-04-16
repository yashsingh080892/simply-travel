import React, { useState } from "react";
import JsonData from "../../public/data.json";
import moment from "moment/moment";
import { Moment } from "moment";
import { VerticalTimeLineProps } from "../../interfaces/vertical-timeline-props";
import { FlightDetailProps } from "../../interfaces/flight-details-props";
import {assetPrefix} from "../../next.config";
import ImageWithAssetPrefix from "../image/image";

const FlightImage = (flightName: any) =>{
  switch(flightName["flightName"]) {
    case "Air India":
      return <ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/airline-logos/air-india.svg"} className="mx-auto" alt=""/>
    case 'Air France':
      return <ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/airline-logos/air-france.svg"} className="mx-auto" alt=""/>
    case 'Turkish Airlines':
      return <ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/airline-logos/turkish-airlines.svg"} className="mx-auto" alt=""/>
    default:
      return <ImageWithAssetPrefix height={30} width={30} src={assetPrefix+"/airline-logos/air-france.svg"} className="mx-auto" alt=""/>
  }
}

function getAirportMapping(cityName:any) {
  const airportMapping = new Map();
  airportMapping.set('Los Angeles', 'Los Angeles International Airport');
  airportMapping.set('Washington, D.C.', 'Washington Dulles International Airport');
  airportMapping.set('New York City', 'John F. Kennedy International Airport');
  airportMapping.set('London', 'London Heathrow International Airport');
  airportMapping.set('Mumbai', 'Chatrapathi Shivaji International Airport');
  airportMapping.set('Delhi', 'Delhi Airport');
  airportMapping.set('Pune', 'Pune Airport');
  airportMapping.set('Kathmandu', 'Tribhuvan International Airport');
  airportMapping.set('Hyderabad', 'Rajiv Gandhi International Airport');
  airportMapping.set('Kolkata', 'Netaji Subhash Chandra Bose International Airport');
  airportMapping.set('Bengaluru', 'Bengaluru International Airport');
  airportMapping.set('Goa', 'Dabolim Goa International Airport');
  airportMapping.set('Chennai', 'Madras,Chennai International Airport');
  airportMapping.set('San Francisco', 'San Francisco International Airport');
  airportMapping.set('Singapore', 'Changi Airport');
  airportMapping.set('Chicago', 'Chicago Airport');
  airportMapping.set('Bangkok', 'Suvarnabhumi Airport');

  return airportMapping.get(cityName);
}

function formatTime(timeStr: any) {
  if (typeof timeStr !== 'string') {
    return ''; // or handle the case when timeStr is not a string
  }

  const [hours, minutes] = timeStr.split(":").slice(0, 2);
  return `${hours}:${minutes}`;
}


function formatDuration(timeStr: any) {
  if (typeof timeStr !== 'string') {
    return ''; // or handle the case when timeStr is not a string
  }

  const [hours, minutes] = timeStr?.split(":").slice(0, 2);
  return `${hours} h ${minutes} m`;
}

const FlightDetail = (props: FlightDetailProps) => {
  const tr_path = props.flight;
  let selectedDate = moment().add(5, 'days').format("dddd, MMMM D, YYYY");
  return (
      <>

        { tr_path?.length > 1 ? tr_path.map((path:any, i:number) => {
         return (<div key={i}  className={"border rounded-md border-gray-300 my-5"}>
               <div className={"flex flex-row justify-between "}>
                 <div className={"flex flex-col"}>
                   <div className={"font-bold p-5"}>{path.fromLocation} {" "} to {" "} {path.toLocation}
                     <div className={"border-t border-2 border-gray-300 w-24 mt-1"}></div></div>

                 </div>
                 <div className={"pr-5 pt-5"}>
                   <div className={"font-bold"}>{selectedDate} </div>
                   <div className={"py-1 flex justify-end"}>{path.stops.length == 2 ? "2 Stops":path.stops.length == 1 ? "1 Stops":"Non Stop"} . {path.duration}</div>
                 </div>

               </div>


           { path.stops.length > 0 && path.stops?.map((stop:any, i:number) => {
             return (
             <>
               <div key={i}  className={"px-5 flex flex-row text-gray-600 font-semibold"}>
             <FlightImage flightName={path.name}/>
             <div className={'flex flex-row'}>
               <div>
                 <div className={'px-2 '}> {path.name}</div>
               </div>
               <div>
                 <div className={''}> {'\u25CF'}</div>
               </div>
               <div>
                 <div className={'px-2'}> {path.number}</div>
               </div>
               <div>
                 <div className={''}> {'\u25CF'}</div>
               </div>
               <div>
                 <div className={'px-2'}> Economy</div>
               </div>
             </div>
           </div>

             <div  className={'px-5 py-2 flex flex-row justify-between'}>
           <div className={'flex flex-row '}>
             <div className={'flex flex-col py-2'}>
               <div className={' font-bold'}>
                 {formatTime(path.startTime)}
               </div>
               <div className={'h-full'}></div>
               <div className={'font-bold'}>
                 {formatTime(path.endTime)}
               </div>
             </div>
             <div className={'flex flex-col h-full px-2'}>
               <div className={'relative top-2 text-gray-400'}>
                 {'\u25CF'}
               </div>
               <div className={''}>
                 <ol className={'h-12 relative left-1 border-l-2 border-r-neutral-300'}></ol>
               </div>
               <div className={'relative bottom-2 text-gray-400'}>
                 {'\u25CF'}
               </div>
             </div>

             <div className={'flex-col flex p-2 pl-0 h-full'}>
               <div className={'flex flex-row'}>
                 <div className={'font-bold px-1'}>{i == 0 ? path.fromLocation : path.stops[i-1].cityName}</div>
                 <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                 <div className={"px-1"}>{getAirportMapping(path.fromLocation)},</div>
                 <div>Economy</div>
               </div>
               <div className={'py-2.5 pt-3 text-sm'}>
                 {formatDuration(path.duration)}
               </div>
               <div className={'flex flex-row'}>
                 <div className={'font-bold px-1'}>{stop.cityName}</div>
                 <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                 <div className={"px-1"}>{getAirportMapping(stop.cityName)},</div>
                 <div>Economy</div>
               </div>
             </div>
           </div>

               {(props.isFlightListItemDetail && !props.showRefundDetails) &&
                   <div className={"justify-end"}>
                     <div className={"font-bold flex justify-end"}>
                       Baggage
                     </div>
                     <div className={"flex justify-end"}>
                       Cabin - {path.cabinBaggage}
                     </div>
                     <div className={"flex justify-end"}>
                       {path.checkInBaggage}
                     </div>

                   </div>
               }
               {(props.showRefundDetails && path.refundable ) && <div>

                 <table className="text-center border rounded-5 border-hidden shadow-table">
                   <tr>
                     <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                       0 to 24 hrs
                     </th>
                     <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                       24 hrs to 365 days
                     </th>
                   </tr>
                   <tr>
                     <td className="border-0.5 border-grey py-2 px-1 text-base font-normal text-ts-red">
                       Non-refundable
                     </td>
                     <td className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                       $364
                     </td>
                   </tr>
                 </table>
               </div>}

         </div>
          <div className={"bg-stone-200 py-1 text-sm mb-2 pl-10"}>Changes of Planes . {formatDuration(stop.layoverTime)} Layover in {stop.cityName}</div>
             </>)}
           )}

               <>
                 <div className={"px-5 flex flex-row text-gray-600 font-semibold"}>
                   <FlightImage flightName={path.name}/>
                   <div className={'flex flex-row'}>
                     <div>
                       <div className={'px-2 '}> {path.name}</div>
                     </div>
                     <div>
                       <div className={''}> {'\u25CF'}</div>
                     </div>
                     <div>
                       <div className={'px-2'}> {path.number}</div>
                     </div>
                     <div>
                       <div className={''}> {'\u25CF'}</div>
                     </div>
                     <div>
                       <div className={'px-2'}> Economy</div>
                     </div>
                   </div>
                 </div>

                 <div className={'px-5 py-2 flex flex-row justify-between'}>
                   <div className={'flex flex-row '}>
                     <div className={'flex flex-col py-2'}>
                       <div className={' font-bold'}>
                         {formatTime(path.startTime)}
                       </div>
                       <div className={'h-full'}></div>
                       <div className={'font-bold'}>
                         {formatTime(path.endTime)}
                       </div>
                     </div>
                     <div className={'flex flex-col h-full px-2'}>
                       <div className={'relative top-2 text-gray-400'}>
                         {'\u25CF'}
                       </div>
                       <div className={''}>
                         <ol className={'h-12 relative left-1 border-l-2 border-r-neutral-300'}></ol>
                       </div>
                       <div className={'relative bottom-2 text-gray-400'}>
                         {'\u25CF'}
                       </div>
                     </div>

                     <div className={'flex-col flex p-2 pl-0 h-full'}>
                       <div className={'flex flex-row'}>
                         <div className={'font-bold px-1'}>{path.stops[path.stops.length-1]?.cityName}</div>
                         <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                         <div className={"px-1"}>{getAirportMapping(path.fromLocation)},</div>
                         <div>Economy</div>
                       </div>
                       <div className={'py-2.5 pt-3 text-sm'}>
                         {formatDuration(path.duration)}
                       </div>
                       <div className={'flex flex-row'}>
                         <div className={'font-bold px-1'}>{path.toLocation}</div>
                         <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                         <div className={"px-1"}>{getAirportMapping(path.toLocation)},</div>
                         <div>Economy</div>
                       </div>
                     </div>
                   </div>

                   {(props.isFlightListItemDetail && !props.showRefundDetails) &&
                       <div className={"justify-end"}>
                         <div className={"font-bold flex justify-end"}>
                           Baggage
                         </div>
                         <div className={"flex justify-end"}>
                           Cabin - {path.cabinBaggage}
                         </div>
                         <div className={"flex justify-end"}>
                           {path.checkInBaggage}
                         </div>

                       </div>
                   }
                   {(props.showRefundDetails && path.refundable ) && <div>
                     <table className="text-center border rounded-5 border-hidden shadow-table">
                       <tr>
                         <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                           0 to 24 hrs
                         </th>
                         <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                           24 hrs to 365 days
                         </th>
                       </tr>
                       <tr>
                         <td className="border-0.5 border-grey py-2 px-1 text-base font-normal text-ts-red">
                           Non-refundable
                         </td>
                         <td className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                           $364
                         </td>
                       </tr>
                     </table>
                   </div>}
                 </div>

               </>
               </div>
        )}
        )  :

            <div className={"border rounded-md border-gray-300 my-5"}>
              <div className={"flex flex-row justify-between "}>
                <div className={"flex flex-col"}>
                  <div className={"font-bold p-5"}>{tr_path?.fromLocation} {" "} to {" "} {tr_path?.toLocation}
                    <div className={"border-t border-2 border-gray-300 w-24 mt-1"}></div></div>

                </div>
                <div className={"pr-5 pt-5"}>
                  <div className={"font-bold"}>{selectedDate} </div>
                  <div className={"py-1 flex justify-end"}>{tr_path?.stops.length == 2 ? "2 Stops":tr_path?.stops.length == 1 ? "1 Stops":"Non Stop"} . {tr_path?.duration}</div>
                </div>

              </div>


              { tr_path?.stops.length > 0 && tr_path?.stops?.map((stop:any, i:number) => {
                return (
                    <>
                      <div key={i}  className={"px-5 flex flex-row text-gray-600 font-semibold"}>
                        <FlightImage flightName={tr_path?.name}/>
                        <div className={'flex flex-row'}>
                          <div>
                            <div className={'px-2 '}> {tr_path?.name}</div>
                          </div>
                          <div>
                            <div className={''}> {'\u25CF'}</div>
                          </div>
                          <div>
                            <div className={'px-2'}> {tr_path?.number}</div>
                          </div>
                          <div>
                            <div className={''}> {'\u25CF'}</div>
                          </div>
                          <div>
                            <div className={'px-2'}> Economy</div>
                          </div>
                        </div>
                      </div>

                      <div className={'px-5 py-2 flex flex-row justify-between'}>
                        <div className={'flex flex-row '}>
                          <div className={'flex flex-col py-2'}>
                            <div className={' font-bold'}>
                              {formatTime(tr_path?.startTime)}
                            </div>
                            <div className={'h-full'}></div>
                            <div className={'font-bold'}>
                              {formatTime(tr_path?.endTime)}
                            </div>
                          </div>
                          <div className={'flex flex-col h-full px-2'}>
                            <div className={'relative top-2 text-gray-400'}>
                              {'\u25CF'}
                            </div>
                            <div className={''}>
                              <ol className={'h-12 relative left-1 border-l-2 border-r-neutral-300'}></ol>
                            </div>
                            <div className={'relative bottom-2 text-gray-400'}>
                              {'\u25CF'}
                            </div>
                          </div>

                          <div className={'flex-col flex p-2 pl-0 h-full'}>
                            <div className={'flex flex-row'}>
                              <div className={'font-bold px-1'}>{i == 0 ? tr_path?.fromLocation : tr_path?.stops[i-1].cityName}</div>
                              <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                              <div className={"px-1"}>{getAirportMapping(tr_path?.fromLocation)},</div>
                              <div>Economy</div>
                            </div>
                            <div className={'py-2.5 pt-3 text-sm'}>
                              {formatDuration(tr_path?.duration)}
                            </div>
                            <div className={'flex flex-row'}>
                              <div className={'font-bold px-1'}>{stop?.cityName}</div>
                              <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                              <div className={"px-1"}>{getAirportMapping(stop?.cityName)},</div>
                              <div>Economy</div>
                            </div>
                          </div>
                        </div>

                        {(props.isFlightListItemDetail && !props.showRefundDetails) &&
                            <div className={"justify-end"}>
                              <div className={"font-bold flex justify-end"}>
                                Baggage
                              </div>
                              <div className={"flex justify-end"}>
                                Cabin - {tr_path?.cabinBaggage}
                              </div>
                              <div className={"flex justify-end"}>
                                {tr_path?.checkInBaggage}
                              </div>

                            </div>
                        }
                        {(props.showRefundDetails && tr_path.refundable  ) && <div>
                          <table className="text-center border rounded-5 border-hidden shadow-table">
                            <tr>
                              <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                                0 to 24 hrs
                              </th>
                              <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                                24 hrs to 365 days
                              </th>
                            </tr>
                            <tr>
                              <td className="border-0.5 border-grey py-2 px-1 text-base font-normal text-ts-red">
                                Non-refundable
                              </td>
                              <td className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                                $364
                              </td>
                            </tr>
                          </table>
                        </div>}


                      </div>
                      <div className={"bg-stone-200 py-1 text-sm mb-2 pl-10"}>Changes of Planes . {stop.layoverTime} Layover in {stop.cityName}</div>
                    </>)}
              )}

              <>
                <div className={"px-5 flex flex-row text-gray-600 font-semibold"}>
                  <FlightImage flightName={tr_path?.name}/>
                  <div className={'flex flex-row'}>
                    <div>
                      <div className={'px-2 '}> {tr_path?.name}</div>
                    </div>
                    <div>
                      <div className={''}> {'\u25CF'}</div>
                    </div>
                    <div>
                      <div className={'px-2'}> {tr_path?.number}</div>
                    </div>
                    <div>
                      <div className={''}> {'\u25CF'}</div>
                    </div>
                    <div>
                      <div className={'px-2'}> Economy</div>
                    </div>
                  </div>
                </div>

                <div className={'px-5 py-2 flex flex-row justify-between'}>
                  <div className={'flex flex-row '}>
                    <div className={'flex flex-col py-2'}>
                      <div className={' font-bold'}>
                        {formatTime(tr_path?.startTime)}
                      </div>
                      <div className={'h-full'}></div>
                      <div className={'font-bold'}>
                        {formatTime(tr_path?.endTime)}
                      </div>
                    </div>
                    <div className={'flex flex-col h-full px-2'}>
                      <div className={'relative top-2 text-gray-400'}>
                        {'\u25CF'}
                      </div>
                      <div className={''}>
                        <ol className={'h-12 relative left-1 border-l-2 border-r-neutral-300'}></ol>
                      </div>
                      <div className={'relative bottom-2 text-gray-400'}>
                        {'\u25CF'}
                      </div>
                    </div>

                    <div className={'flex-col flex p-2 pl-0 h-full'}>
                      <div className={'flex flex-row'}>
                        <div className={'font-bold px-1'}>{tr_path?.stops.length > 0 ? tr_path?.stops[tr_path?.stops.length-1]?.cityName : tr_path?.fromLocation}</div>
                        <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                        <div className={"px-1"}>{getAirportMapping(tr_path?.stops.length > 0 ? tr_path?.stops[tr_path?.stops.length-1]?.cityName : tr_path?.fromLocation)},</div>
                        <div>Economy</div>
                      </div>
                      <div className={'py-2.5 pt-3 text-sm'}>
                        {formatDuration(tr_path?.duration)}
                      </div>
                      <div className={'flex flex-row'}>
                        <div className={'font-bold px-1'}>{tr_path?.toLocation}</div>
                        <div className={'text-xs pb-1 flex items-end px-1'}> {'\u25CF'}</div>
                        <div className={"px-1"}>{getAirportMapping(tr_path?.toLocation)},</div>
                        <div>Economy</div>
                      </div>
                    </div>
                  </div>
                  {(props.isFlightListItemDetail && !props.showRefundDetails) &&
                      <div className={"justify-end"}>
                        <div className={"font-bold flex justify-end"}>
                          Baggage
                        </div>
                        <div className={"flex justify-end"}>
                          Cabin - {tr_path?.cabinBaggage}
                        </div>
                        <div className={"flex justify-end"}>
                          {tr_path?.checkInBaggage}
                        </div>

                      </div>
                  }
                  {(props.showRefundDetails && tr_path.refundable ) && <div>
                    <table className="text-center border rounded-5 border-hidden shadow-table">
                      <tr>
                        <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                          0 to 24 hrs
                        </th>
                        <th className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                          24 hrs to 365 days
                        </th>
                      </tr>
                      <tr>
                        <td className="border-0.5 border-grey py-2 px-1 text-base font-normal text-ts-red">
                          Non-refundable
                        </td>
                        <td className="border-0.5 border-grey py-2 px-1 text-base font-normal">
                          $364
                        </td>
                      </tr>
                    </table>
                  </div>}
                </div>

              </>
            </div>
        }
        </>
  );
};

export default FlightDetail;
