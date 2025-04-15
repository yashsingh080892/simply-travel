import React from "react";

interface Item{
    HeaderPortion : React.ReactNode,
    Content : React.ReactNode
};

export interface AccordianProps{
    items: Item[],
    hideBorder?:boolean,
    defaultOpen?:boolean,
    id?: any,
};
