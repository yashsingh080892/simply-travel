import ImageWithAssetPrefix from "./image/image";
import {assetPrefix}  from './../next.config';

const FlightsUsed= (props: any) =>{
    let flight = props.flight;
    // console.log(flight)
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

   return (
    <div className={"flex flex-row"}>
        {flight.length > 0   ?

            flight.map((airline:any, i:number) =>{
                return <div key={airline.id} className={"flex py-1 "+(i >0 ?"pl-20":"")}>

                    <div className="w-1/3">
                        <FlightImage flightName = {airline.name} />
                    </div>
                    <div className={"w-2/3"}>
                        <div className="text-lg font-bold pb-1 w-28">
                            {airline.name}
                        </div>
                        <div className="text-xs font-normal">
                            {airline.number}
                        </div>
                    </div>
                </div>;
            })
            :
            <div className="flex py-1 pl-5">
                <div className="w-1/3">
                    <FlightImage flightName = {flight.name} />
                </div>
                <div className={"w-2/3"}>
                    <div className="text-lg font-bold pb-1 w-28">{flight.name}</div>
                    <div className="text-xs font-normal">{flight.number}</div>
                </div>
            </div>
        }
    </div>
   )
}
export default FlightsUsed;



