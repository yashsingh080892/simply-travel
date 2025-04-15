import styles from "./index.module.scss";
import {useEffect, useState} from "react";
import {SliderProps} from "../../../interfaces/slider-props";

const Slider = (props:SliderProps) => {
    let [value,setValue] = useState(props.value||props.min);
    const onChange = (event: any)=>{
        setValue(event.target.value);
    };
    useEffect(()=>{
        setValue(props.value);
    },[props.value]);
    const getBackgroundSize = () => {
        return { backgroundSize: `${((value-props.min) * 100) / (props.max-props.min)}% 100%` };
    };
    const getCurrentValueLeft = () => {
        const position = ((value-props.min) * 100) / (props.max-props.min);
        return { left : `calc(${ position }% + (${13 - position * 0.15}px)` }
    };

    const onMouseUp = (event: any) =>{
        props.onChange(event.target.value);
    };

    return (
        <div className="py-1.5">
            <div className="relative mt-2.5">
                <input
                    id={props.id}
                    type="range"
                    min={props.min}
                    max={props.max}
                    onChange={onChange}
                    style={getBackgroundSize()}
                    value={value}
                    onMouseUp={onMouseUp}
                    className={`${styles.input} appearance-none h-1.5 bg-grey rounded-md bg-gradient-to-r from-primary to-primary bg-no-repeat w-full my-2.5`}
                />
                {
                    // @ts-ignore
                    props.valueFormater(props.value) ? <span className="absolute -top-5 -translate-x-2/4 text-primary w-fit pr-12" style={getCurrentValueLeft()}>{props.valueFormater(value)}</span> : null
                }
            </div>
            <div className="flex justify-between">
                <span>{props.valueFormater(props.min)}</span>
                <span>{props.valueFormater(props.max)}</span>
            </div>
        </div>
    )
}

export default Slider;
