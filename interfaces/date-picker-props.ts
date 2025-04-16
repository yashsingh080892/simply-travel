export interface DatePickerProps {
    handleClose?:()=>{},
    onChange : ({}) => {},
    value : Date|null,
    minDate? : Date|null,
    index? : number
};