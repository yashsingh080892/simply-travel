import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {TextField} from "@mui/material";
import {DatePickerProps} from "../../interfaces/date-picker-props";
import React, {useState} from "react";

const DatePicker = (props:DatePickerProps) => {
    const onSelect = (date:any) => {
        props.onChange({ date , index : props.index });
        if(props.handleClose)
           props.handleClose()
    };
    const preventChildClickEventBubble = (event?:any) => {
        if (event?.preventDefault) {
            event?.preventDefault && event.preventDefault();
            event?.stopPropagation && event.stopPropagation();
        }
    };
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div onClick={preventChildClickEventBubble}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={ props.value }
                    onChange={onSelect}
                    minDate={ props.minDate || new Date() }
                    closeOnSelect={true}
                    renderInput={(props) => <TextField {...props} />}/>
            </div>
        </LocalizationProvider>
    );
}

export default DatePicker;
