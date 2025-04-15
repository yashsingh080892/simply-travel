import * as AccordionRadix from "@radix-ui/react-accordion";
import React from "react";
import styles from "./index.module.scss";
import {AccordianProps} from "../../interfaces/accordian-props";

const Accordion = (props:AccordianProps) => {
    function id(index:any){
        if(index) {
            var arr = index?.split(' ');
            if (arr[1]) {
                var index1 = parseInt(arr[1]);
                var idMapper = new Map();
                idMapper.set(0, "zero");
                idMapper.set(1, "one");
                idMapper.set(2, "two");
                idMapper.set(3, "three");
                idMapper.set(4, "four");
                idMapper.set(5, "five");
                idMapper.set(6, "six");
                idMapper.set(7, "seven");
                idMapper.set(8, "eight");
                idMapper.set(9, "nine");
                idMapper.set(10, "ten");
                return arr[0] + "-" + idMapper.get(index1);
            } else {
                return index;
            }
        }
    }
    return <AccordionRadix.Root type="multiple" className="w-full"  defaultValue={props.defaultOpen? ['item-0']:[] } >
        {
            props.items.map((item,index)=>(
                <AccordionRadix.Item
                    key={index}
                    value={`item-${index}`}
                >
                    <AccordionRadix.Header className="py-4 px-6">
                        <AccordionRadix.Trigger className={`${styles.trigger} items-center pl-px bg-no-repeat w-full flex justify-between items-center${!props.hideBorder&&' relative before:content before:absolute before:left-0 before:-bottom-4 before:w-full before:border-0.5 before:border-grey-secondary'}`} id={id(props.id)}>
                            { item.HeaderPortion }
                            <svg fill="none" viewBox="0 0 20 20" className={`${styles.drop_icon} stroke-primary w-6 h-6`}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 8 4 4 4-4"/>
                            </svg>
                        </AccordionRadix.Trigger>
                    </AccordionRadix.Header>
                    <AccordionRadix.Content className={`${styles.accordion_content} outline-none`}>
                        { item.Content }
                    </AccordionRadix.Content>
                </AccordionRadix.Item>
            ))
        }
    </AccordionRadix.Root>
};

export default Accordion;
