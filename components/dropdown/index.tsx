import {ClickAwayListener, Popover} from "@mui/material";
import React, {ReactElement, useState} from "react";
import {PopoverOrigin} from "@mui/material/Popover/Popover";
import {DropdownProps} from "../../interfaces/dropdown-props";

const defaultAnchorOrigin: PopoverOrigin = {
    vertical: 'bottom',
    horizontal: 'left'
}

const defaultTransformOrigin: PopoverOrigin = {
    vertical: 'top',
    horizontal: 'left'
}

const DropDown = (props:DropdownProps) => {
    let [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [open , setOpen] = useState(props.open||false);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = (event?: any) => {
        if (event?.preventDefault) {
            event?.preventDefault && event.preventDefault();
            event?.stopPropagation && event.stopPropagation();
        }
        setOpen(false);
    };

    return(
            // @ts-ignore
            <div className={props.className} onClick={handleClick} id={props.idName}>
                {
                    props.trigger ? props.trigger : null
                }
                <Popover
                    open={open && props.open!=false}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={props.anchorOrigin||defaultAnchorOrigin}
                    transformOrigin={props.transformOrigin||defaultTransformOrigin}
                    className="rounded-md"
                >
                    {
                        //@ts-ignore
                        props.content ? React.cloneElement(props.content,{handleClose}) : null
                    }
                </Popover>
            </div>

    );
}

export default DropDown;
