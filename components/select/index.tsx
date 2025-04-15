import styles from "./index.module.scss";
import {SelectProps} from "../../interfaces/select-props";

const SelectField = (props:SelectProps) => {
    const onChange = (event: any) => {
        props.onChange(event.target.value);
    };
    return <select id={props.id} onChange={onChange} className={`${styles.select} h-fit bg-no-repeat appearance-none border ${props.error?'border-ts-red':'border-grey'} focus:border-primary py-2 pl-3.5 pr-9 rounded-5 outline-none text-sm text-secondary${props.className&&` ${props.className}`}`}>
        <option className="text-sm" selected={!props.value}>{props.placeholder}</option>
        {
            props.types.map((type, i)=>{
                const isSelected = type === props.value;
                return <option key={i} className="text-sm" selected={isSelected} value={type} id={props.id+'-'+(i+1)}>{type}</option>
            })
        }
    </select>
};

export default SelectField;
