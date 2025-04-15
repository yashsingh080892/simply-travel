import React, {useEffect, useState} from "react";
import {string} from "prop-types";
import {setSeletedSeats,removeSeletedSeats} from "../redux/actions/passengersDetailActions";
import {SeatSelectionProps} from "../interfaces/seat-selection-props";
import {assetPrefix} from "../next.config";
import ImageWithAssetPrefix from "./image/image";
import SeatDetailsService from "../services/seat-details.service";
import {SeatDetails} from "../models/seat-details.model";

const SeatSelectionComponent = (props:SeatSelectionProps) => {

    useEffect(() => {
        setSelectedSeats([])
    }, [props.removeSeatSelection]);

    console.log(props.setFlight.length)

    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const selectedSeatsArray:any = [];

    function setSelectedSeat(seat: string) {
            if (selectedSeats.indexOf(seat) == -1) {
                if (selectedSeats.length < props.totalPassengers) {
                    selectedSeats.push(seat);
                    selectedSeatsArray.push([...selectedSeats])
                    console.log(selectedSeatsArray)
                    console.log("if")
                }
            } else {
                selectedSeats.splice(selectedSeats.indexOf(seat), 1)
                console.log("else")
            }
            setSelectedSeats([...selectedSeats]);

            if(props.setSeletedSeats){
               props.setSeletedSeats({selectedSeats:[...selectedSeats]});
               props.setSeat([...selectedSeats]);}
    }
    console.log(props.setData);

    return (
    <div className="flex p-14 w-full">
        <div className="ml-auto pt-6">
            <div className="flex text-lg pb-4">
                <div className="my-auto">
                    <ImageWithAssetPrefix height={16} width={16} src={assetPrefix+"/flight-icon.svg"} alt=""/>
                </div>
                <div className="my-auto pl-2.5 font-semibold">Air India - AI 154 - Domestic Route</div>
            </div>
            <div className="flex text-lg">
                <div className="w-4 h-4 border-ts-black my-auto rounded-sm border-2"></div>
                <div className="my-auto pl-2.5 font-semibold w-64">Selected Seats - {selectedSeats.sort().join(", ")}</div>
            </div>
            <div className="flex pt-14 text-sm py-1 text-secondary">
                <div className="rounded-1 w-4 h-4 my-auto bg-ts-green"></div>
                <div className="my-auto pl-2.5">No additional Cost</div>
            </div>
            <div className="flex text-sm py-1 text-secondary">
                <div className="rounded-1 w-4 h-4 my-auto bg-jordy-blue"></div>
                <div className="my-auto pl-2.5">$5</div>
            </div>
            <div className="flex text-sm py-1 text-secondary">
                <div className="rounded-1 w-4 h-4 my-auto bg-ts-yellow flex">
                    <ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/star-icon.svg"} className="m-auto" alt=""/>
                </div>
                <div className="my-auto pl-2.5">$14</div>
            </div>
            <div className="flex text-sm py-1 text-secondary">
                <div className="rounded-1 w-4 h-4 my-auto bg-grey overflow-hidden"><div className="bg-ts-red h-2 w-2 rotate-45 ml-auto  translate-x-1/2 -translate-y-1/2"></div></div>
                <div className="my-auto pl-2.5">Exit Row Seat</div>
            </div>
        </div>
        <div className="w-1/2 flex">
            <div className="flex flex-col text-sm">
                <div className="z-0">
                    <ImageWithAssetPrefix height={242} width={350} src={assetPrefix+"/plane-nose.svg"} className="w-full" alt=""/>
                </div>
                <div>
                    <div className="px-8 mx-2.5 flex justify-center shadow-flight -my-4 pt-1">
                        {Array.isArray(props.setData) && props.setData?.map( (seatColumn, i) =>{
                                return (
                                    <div key={i} className={`px-2.5 ${((i+1) % 3 == 0) && (i+1)<props.setData.length? 'pr-8':''} text-center`}>
                                        {seatColumn.columnName}
                                        {Array.from(Array(seatColumn.numberOfRows).keys()).map( (row,j) => {
                                            return (
                                                <div key={row} className={`flex text-sm py-1 text-secondary relative ${j<4?' hidden':''}`}>
                                                    <div className={`h-2 w-2 ${i!=0?'hidden':''} absolute right-12`}>{j}</div>
                                                    <div className={`rounded-1 w-4 h-4 my-auto overflow-hidden relative flex cursor-pointer outline-offset-0 outline-black
                                                                    ${props.setData[i].economyRows.indexOf(j)!=-1?' bg-ts-green':
                                                                    (props.setData[i].premiumRows.indexOf(j)!=-1?' bg-ts-yellow':
                                                                    (props.setData[i].businessRows.indexOf(j)!=-1?' bg-jordy-blue':' pointer-events-none bg-grey'))}
                                                                    ${ selectedSeats?.indexOf((seatColumn.columnName+j))==-1? '':' outline-none'}
                                                                    `}
                                                        onClick={()=>setSelectedSeat(seatColumn.columnName+j)} id={seatColumn.columnName+j}>

                                                        {props.setData[i].exitRows.indexOf(j)!=-1 && <div className={`bg-ts-red h-2 w-2 rotate-45 ml-auto ml-3 -translate-y-1/2 absolute ${props.setData[i].exitRows.indexOf(j)==-1?'hidden':''}`}></div>}
                                                        {props.setData[i].premiumRows.indexOf(j)!=-1 && <div className="mx-auto"><ImageWithAssetPrefix height={8} width={8} src={assetPrefix+"/star-icon.svg"} className="m-auto" alt=""/></div>}
                                                    </div>
                                                    <div className={`h-2 w-2 ${i!=props.setData.length-1?'hidden':''} absolute left-12`}>{j}</div>
                                                </div>);
                                        })}
                                    </div>
                                );
                            }
                        )}
                    </div>
                </div>
                <div className="z-0">
                    <ImageWithAssetPrefix height={292} width={350} src={assetPrefix+"/plane-tail.svg"} alt="" className="w-full"/>
                </div>
            </div>
        </div>
    </div>
    );
}
export default SeatSelectionComponent;
