import Checkbox from './../forms/checkbox';
import Slider from "../forms/slider";
import data from "../../public/data.json"
import {connect} from "react-redux";
import {
  removeAirlinesFilter,
  removeFavFilter, removeStopsFilter, setAirlinesFilter,
  setDurationRange,
  setFavFilter,
  setLayoverDurationRange,
  setPriceRange, setStopsFilter
} from "../../redux/actions/filterActions";
import ignore from "ignore";
import {FlightFilterProps} from "../../interfaces/flight-filter-props";
import {Store} from "../../redux/store";

const defaultRanges = {
  priceLimit:{
    start:0,
    end:8000
  },
  duration:{
    start:0,
    end:1440
  }
};

const FlightFilters = (props:FlightFilterProps) => {

  const onChangeAirlinesFilter=(airline:string,value:boolean)=>{
    if(value){
      props.setAirlinesFilter(airline);
    }else{
      props.removeAirlinesFilter(airline);
    }
  };

  const onChangePopularFilter = (id:string,value:boolean)=>{
    if(value){
      props.setFavFilter(id);
    }else{
      props.removeFavFilter(id);
    }
  };

  const onChangeStopsFilter = (id:number,value:boolean)=>{
    if(value){
      props.setStopsFilter(id);
    }else{
      props.removeStopsFilter(id);
    }
  };

  const moneyValueFormater = (value:number) => {
    return `$${value}`;
  };

  const timeValueFormater = (value:number) => {
    return `${Math.trunc(value/60)}h ${value%60}min`;
  };

  const clearFilter = () => {
    props.airlines.forEach((airline)=>{
      onChangeAirlinesFilter(airline, false);
    })
    props.favFilters?.forEach((favFilter)=>{
      onChangePopularFilter(favFilter, false);
    })
    props.stopsCount?.forEach((stop)=>{
      onChangeStopsFilter(stop, false);
    })
    // setDurationRange(1440);
    props.setDurationRange(1440);
    // setPriceRange(8000);
    props.setPriceRange(8000);
    // setLayoverDurationRange(1440);
    props.setLayoverDurationRange(1440);
  }

  return (
    <>
      <div className="ts-t-flight-filters w-full">
        <div className="flex items-center justify-between pb-2.5 pt-2.5">
          <span className="font-bold text-secondary">Popular Filters</span>
          <span className="font-bold text-primary cursor-pointer" id={'clear'} onClick={clearFilter}>Clear</span>
        </div>
        {
          //@ts-ignore
          data.popularFilters.map((filter:any, i: number)=>{
            //@ts-ignore
            const isChecked = props.favFilters.indexOf(filter.filterKey)!==-1;
            return <Checkbox key={i} onChange={onChangePopularFilter} label={filter.name} id={filter.filterKey} price={filter.ph_price} checked={isChecked} />
          })
        }
        <div className="flex items-center pb-2.5 pt-7">
          <span className="font-bold text-secondary">Price Range</span>
        </div>
        <Slider id={'slider-price-range'} onChange={props.setPriceRange} valueFormater={moneyValueFormater} value={props.priceRange} min={defaultRanges.priceLimit.start} max={defaultRanges.priceLimit.end}/>
        <div className="flex items-center pb-2.5 pt-7">
          <span className="font-bold text-secondary">Duration</span>
        </div>
        <Slider id={'slider-duration'} onChange={props.setDurationRange} valueFormater={timeValueFormater} value={props.durationRange} min={defaultRanges.duration.start} max={defaultRanges.duration.end}/>
        <div className="flex items-center pb-2.5 pt-7">
          <span className="font-bold text-secondary">Stops</span>
        </div>
        {
          data.stops.map((stopData, i:number)=>{
            const isChecked = props.stopsCount.indexOf(stopData.id)!==-1;
            return <Checkbox key={i} onChange={onChangeStopsFilter} label={stopData.name} id={stopData.id} price={stopData.ph_price} checked={isChecked} />
          })
        }
        <div className="flex items-center pb-2.5 pt-7">
          <span className="font-bold text-secondary">Airlines</span>
        </div>
        {
          data.airlines.map((airline,index)=>{
            const isChecked = props.airlines.indexOf(airline.id)!==-1;
            return <Checkbox key={index} label={airline.name} onChange={onChangeAirlinesFilter} id={airline.id} price="1,009" checked={isChecked} />;
          })
        }
        <div className="flex items-center pb-2.5 pt-7">
          <span className="font-bold text-secondary">Layover Duration</span>
        </div>
        <Slider id={'slider-layover-duration'} onChange={props.setLayoverDurationRange} valueFormater={timeValueFormater} value={props.layoverDurationRange} min={defaultRanges.duration.start} max={defaultRanges.duration.end} />
      </div>
    </>
  )
}

const mapStateToProps = (state:Store) => {

  return {
    favFilters : state?.filters?.favFilters||[],
    stopsCount: state?.filters?.stopsCount||[],
    priceRange : Number(state?.filters?.priceRange || 8000 ),
    durationRange : Number( state?.filters?.durationRange || 1440 ),
    layoverDurationRange : Number( state?.filters?.layoverDurationRange || 1440),
    airlines : state?.filters?.airlines||[]
  }
};

const mapDispatchToProps = {
  setFavFilter,
  removeFavFilter,
  setPriceRange,
  setDurationRange,
  setLayoverDurationRange,
  setStopsFilter,
  removeStopsFilter,
  setAirlinesFilter,
  removeAirlinesFilter
};

// @ts-ignore
export default connect(mapStateToProps,mapDispatchToProps)(FlightFilters);
