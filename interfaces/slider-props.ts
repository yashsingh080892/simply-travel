export interface SliderProps {
    onChange: (value:any)=>{},
    valueFormater:(value:number)=>any,
    min:number,
    max:number,
    value:number,
    id?: any,
}
