export interface FlightFilterProps{
    stopsCount: number[];
    setLayoverDurationRange: (value:number)=>{};
    layoverDurationRange: number;
    favFilters: string[];
    durationRange: number;
    setDurationRange: (value:number)=>{};
    setPriceRange: (value:number)=>{};
    priceRange: number;
    airlines : string[]
    setFavFilter(id:string): void;
    removeFavFilter(id:string): void;
    setStopsFilter:(id:number)=>{};
    removeStopsFilter:(id:number)=>{};
    setAirlinesFilter:(value:string)=>{};
    removeAirlinesFilter:(value:string)=>{};
}