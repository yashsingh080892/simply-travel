import React, {ReactElement} from "react";
import {PopoverOrigin} from "@mui/material/Popover/Popover";

export interface DropdownProps {
    trigger : React.ReactNode,
    content : ReactElement,
    id?: any,
    anchorOrigin?:PopoverOrigin,
    transformOrigin?:PopoverOrigin,
    className?:string,
    open?:boolean,
    idName?: any,
};
