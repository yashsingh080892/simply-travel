export interface InputFieldProps {
    error?:boolean,
    type?:string,
    placeholder:string,
    value?:string,
    className?:string,
    onChange:(value:string)=>void,
    id?:string
}
