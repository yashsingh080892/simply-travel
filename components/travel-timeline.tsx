
function formatTime(timeStr: any) {
    const [hours, minutes] = timeStr.split(":").slice(0, 2);
    return `${hours}:${minutes}`;
}

function formatDuration(timeStr: any) {
    const [hours, minutes] = timeStr.split(":").slice(0, 2);
    return `${hours} h ${minutes} m`;
}

const TravelTimeline = (props: any) => {
    let paths = props.tr_path;
    let selectedDate = props.selectedDate;
    let i =-1;
    return (
        <ol className={"border-t relative w-2/3 flex justify-between mx-auto "+
            (paths.stops?.length ==1? "border-ts-yellow": (paths.stops?.length == 2 ? "border-ts-red" : "border-ts-green"))}>
            <div className="flex w-full absolute font-bold text-sm" style={{marginTop: "-45px"}}>
                <div className="mx-auto"> { formatDuration(paths.duration)}
                    {paths.stops.length == 0 && <div className={"font-normal pt-2 text-secondary"}>No Layover</div>}
                </div>

            </div>

            {/*starting location */}

            <li className={"h-16 w-0"}>
                <div className="flex md:block flex-start items-center pt-2 md:pt-0">

                        <div className="text-sm mt-2 absolute top-0 text-center -translate-x-1/2" style={{marginTop: "-45px"}}>
                            <div className="font-bold">{formatTime(paths.startTime)}</div>
                            <div className="text-secondary font-normal text-sm leading-3 pt-1 whitespace-nowrap">{paths.fromLocation}</div>
                        </div>
                    <div className={"w-9px h-9px rounded-full md:-mt-5px -ml-1 md:ml-0 mr-3 md:mr-0 " + ( i==paths.length-1? "ml-auto ":"")
                        + (paths.stops?.length ==1? "bg-ts-yellow": (paths.stops?.length == 2 ? "bg-ts-red" : "bg-ts-green"))}></div>
                </div>
                    <div className="text-center text-secondary text-sm leading-3 absolute">
                        <div className="-translate-x-1/2 whitespace-nowrap pb-1 pt-2">{selectedDate.format("MMMM Do YYYY")}</div>
                        <div className="-translate-x-1/2 whitespace-nowrap">{selectedDate.format("dddd")}</div>
                    </div>

            </li>

            {/*stops render*/}

            {
                paths.stops?.map((path: any) => {

                i++;
                if(i==paths.stops?.length){
                    props.setFlightTime({dt:paths.startTime , at: paths.endTime});
                }
                return (
                    <li key={i} className={"h-16"+(i==paths.stops?.length?" w-0":"ml-10 w-0")}>
                        <div className="flex md:block flex-start items-center pt-2 md:pt-0">
                                <div className="text-sm mt-2 absolute top-0 text-center -translate-x-1/2" style={{marginTop: "-45px"}}>
                                    <br/>
                                    <div className="text-secondary font-normal  text-sm leading-3 pt-1">
                                        {formatDuration(path.layoverTime)} Layover</div>
                                </div>
                            <div className={"w-9px h-9px rounded-full md:-mt-5px -ml-1 md:ml-0 mr-3 md:mr-0 " + ( i==paths.length? "ml-auto ":"")
                                            + (paths.stops?.length ==1? "bg-ts-yellow": (paths.stops?.length == 2 ? "bg-ts-red" : "bg-ts-green"))}></div>
                        </div>

                            <div className="text-center text-secondary text-sm w-10 leading-3 pt-2">
                                <div className="-translate-x-1/2 pb-1">{"Stop "+ (i+1)}</div>
                                <div className="-translate-x-1/2 ">{path.cityName}</div>
                            </div>


                    </li>
                );
            })
            }
            {paths.stops.length == 0 && <div className={"text-secondary pt-4 text-sm"}>Non Stop</div>}
            {/*ending location*/}

            <li className={"h-16 w-0"}>

                <div className="flex md:block flex-start items-center pt-2 md:pt-0">

                    <div className="text-sm mt-2 absolute top-0 text-center -translate-x-1/2" style={{marginTop: "-45px"}}>
                        <div className="font-bold">{formatTime(paths.endTime)}
                        </div>
                        <div className="text-secondary font-normal text-sm leading-3 pt-1 whitespace-nowrap">{paths.toLocation}</div>
                    </div>
                    <div className={"w-9px h-9px rounded-full md:-mt-5px -ml-1 md:ml-0 mr-3 md:mr-0 " + ( i==paths.length-1? "ml-auto ":"")
                        + (paths.stops?.length ==1? "bg-ts-yellow": (paths.stops?.length == 2 ? "bg-ts-red" : "bg-ts-green"))}></div>
                </div>
                <div className="text-center text-secondary text-sm leading-3 absolute">
                    <div className="-translate-x-1/2 whitespace-nowrap pb-1 pt-2">{selectedDate.format("MMMM Do YYYY")}</div>
                    <div className="-translate-x-1/2 whitespace-nowrap">{selectedDate.format("dddd")}</div>
                </div>

            </li>


        </ol>
    )
}

export default TravelTimeline;