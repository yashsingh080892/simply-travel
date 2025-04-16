import React, {useState} from "react";
import data from "../../public/data.json";
import {PassengerClassFormProps} from "../../interfaces/passenger-class-form-props";

const Heading = (props:any) => {
    return <div className="text-base text-secondary font-bold">{props.heading}</div>
};

function id(index:any){
    var idMapper = new Map();
    idMapper.set(1,"one");
    idMapper.set(2,"two");
    idMapper.set(3,"three");
    idMapper.set(4,"four");
    idMapper.set(5,"five");
    idMapper.set(6,"six");
    idMapper.set(7,"seven");
    idMapper.set(8,"eight");
    idMapper.set(9,"nine");
    idMapper.set(10,"ten");
    return idMapper.get(index);
}

const Counter = (props:any) => {
    let items = [];
    for(let i=0; i<props.count ; i++){
        const value = i+1;
        const isSelected = value===props.selectedValue;
        const onClick = () => {
            props.onChange(value);
        };
        items.push(<span className={`px-3 py-2 cursor-pointer text-base font-normal ${ isSelected ? 'bg-primary text-white rounded border-primary': 'bg-grey-primary border-grey-primary hover:bg-white hover:text-primary hover:rounded'} border`} onClick={onClick} id={`${props.idPrefix}-${id(value)}`}>{value}</span>);
    }
    return (
        <div className="rounded flex overflow-hidden bg-grey-primary">
            {
                items
            }
        </div>
    );
};

const defaultCountLimits = {
    adultMaxLimit : 9,
    childrenMaxLimit : 6,
    infantsMaxLimit : 6
};

const PassengersAndClassForm = (props:PassengerClassFormProps) => {
    let [adult,setAdult] = useState(props.passengersAndClass?.adult||1);
    let [children,setChildren] = useState(props.passengersAndClass?.children||0);
    // @ts-ignore
    let [infants,setInfants] = useState(props.passengersAndClass?.infants||0);
    let [classType,setClassType] = useState(props.passengersAndClass?.classType||1);

    const onSave = (event: any) => {
        props.onSave({
            adult,
            children,
            infants,
            classType
        });
        props.handleClose(event);
    };

    return(
        <div className="px-5 py-5 space-y-5">
            <div className="space-y-2.5">
                <Heading heading={"Adults (12y +)"} />
                <div className="flex items-center space-x-3.5 justify-between">
                    <Counter idPrefix={'adult-count'} selectedValue={adult} onChange={setAdult} count={defaultCountLimits.adultMaxLimit} />
                    <button className="ts-t-primary-btn w-fit px-10 mx-auto" onClick={onSave} id={'done'}>Done</button>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="space-y-2.5">
                    <Heading heading={"Children (2 - 12y)"}></Heading>
                    <Counter idPrefix={'children-count'} selectedValue={children} onChange={setChildren} count={defaultCountLimits.childrenMaxLimit} />
                </div>
                <div className="space-y-2.5">
                    <Heading heading={"Infants (Below 2y)"}></Heading>
                    <Counter idPrefix={'infant-count'} selectedValue={infants} onChange={setInfants} count={defaultCountLimits.infantsMaxLimit} />
                </div>
            </div>
            <div className="space-y-2.5">
                <Heading heading={"Cabin Class"}></Heading>
                <div className="rounded flex overflow-hidden bg-grey-primary space-x-5">
                    {
                        data.classes.map((_classType, id)=>{
                            const isSelected = _classType.id === classType;
                            const onClick = () => {
                                setClassType(_classType.id);
                            };
                            return <span
                                key={id}
                                onClick={onClick}
                                className={`text-base font-normal px-4 whitespace-nowrap py-2 ${ isSelected ? 'bg-primary text-white rounded border-primary' : 'bg-grey-primary border-grey-primary hover:bg-white hover:text-primary hover:rounded'} border flex-auto text-center cursor-pointer`} id={_classType.name}>{_classType.name}</span>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default PassengersAndClassForm;
