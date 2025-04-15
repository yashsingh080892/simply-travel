export interface SelectProps{
    onChange : (value:string|number) => void,
    types : string[]|number[],
    placeholder?:string,
    value?:string|number,
    className ?:string,
    error?:boolean,
    id?:any,
}
