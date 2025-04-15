import SelectField from "../select";
import data from "../../public/data.json";
import {useEffect, useState} from "react";
import {PassengerFormValidationProps} from "../../interfaces/passenger-form-validation-props";
import {TravellerFormProps} from "../../interfaces/traveller-form-props";
import {FieldNameProps} from "../../interfaces/field-name-props";
import {InputFieldProps} from "../../interfaces/input-field-props";
import {ErrorMessageProps} from "../../interfaces/error-message-props";


const genderTypes = ['Male','Female'];
const dateTypes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const monthTypes = [1,2,3,4,5,6,7,8,9,10,11,12];
const thisYear = (new Date()).getFullYear();
let pastYearsType = [thisYear];
let futureYearsType = [thisYear];
for(let i=0,lastPushedYear=thisYear ; i<30 ; i++ ){
    lastPushedYear = lastPushedYear-1;
    pastYearsType.push(lastPushedYear);
}
for(let i=0,lastPushedYear=thisYear;i<14;i++){
    lastPushedYear = lastPushedYear+1;
    futureYearsType.push(lastPushedYear);
}

export const FieldName = (props: FieldNameProps) => {
    return <div className="text-base font-normal">{props.label}</div>
};

export const InputField = (props:InputFieldProps) => {
    const onChange = (event:any) => {
        props.onChange(event.target.value);
    };
    return <input id={props.id} className={`w-4/12 h-fit border appearance-none ${props.error?'border-ts-red':'border-grey'} focus:border-primary py-2 px-3.5 rounded-5 outline-none text-sm `+props.className} onChange={onChange} placeholder={props.placeholder} type={props.type||'text'} value={props.value}/>
};

export const ErrorMessage = (props:ErrorMessageProps)=>{
    return <span className="text-xs text-ts-red py-0.5">{props.message}</span>
};


const passengersFormValidation = (payload:PassengerFormValidationProps) => {
    let {firstName,lastName,gender,dob,passport} = payload;
    let { date , month , year } = dob;
    let { number , nationality , issueCountry , expiryDate } = passport;
    if( firstName?.trim() && lastName?.trim() && gender?.trim() && date && month && year && number?.trim() && nationality?.trim() && issueCountry?.trim() && expiryDate?.date?.trim() && expiryDate?.month?.trim() && expiryDate?.year?.trim() ){
        return true;
    }else {
        return false;
    }
};

const TravellerForm = (props:TravellerFormProps) => {
    let [isSubmitted,setSubmitted] = useState(props?.isSubmitted);

    let [firstName,setFirstName] = useState(props.data.firstName);
    let [lastName,setLastName] = useState(props.data.lastName);
    let [gender,setGender] = useState(props.data.gender);
    let [dobDate,setDobDate] = useState(props.data.dob.date);
    let [dobMonth,setDobMonth] = useState(props.data.dob.month);
    let [dobYear,setDobYear] = useState(props.data.dob.year);
    let [passNum,setPassNum] = useState(props.data.passport.number);
    let [nationality,setNationality] = useState(props.data.passport.nationality);
    let [issueCountry,setIssueCountry] = useState(props.data.passport.issueCountry);
    let [expDate,setExpDate] = useState(props.data.passport.expiryDate.date);
    let [expMonth,setExpMonth] = useState(props.data.passport.expiryDate.month);
    let [expYear,setExpYear] = useState(props.data.passport.expiryDate.year);

    const onSave = ()=>{
        const payload = {
            firstName,
            lastName,
            gender,
            dob: {
                date : dobDate,
                month : dobMonth,
                year : dobYear
            },
            passport:{
                number : passNum,
                nationality : nationality,
                issueCountry : issueCountry,
                expiryDate : {
                    date : expDate,
                    month : expMonth,
                    year : expYear
                }
            }
        };
        setSubmitted(true);
        // @ts-ignore
        if( passengersFormValidation(payload) ){
            props.setPassengerDetails({
                index : props.index,
                type : props.type,
                data : payload
            });
        }
    };

    useEffect(()=>{
        if(props.isSubmitted)
        onSave();
    }, [props.isSubmitted])

    // @ts-ignore
    return <div className="px-6 py-6 space-y-4">
        <div className="space-y-3.5">
            <FieldName label="Traveller Name and Gender"/>
            <div className="space-x-7 flex">
                <div className="w-4/12 flex flex-col" id={'firstname'}>
                    <InputField id={"first-name-input"} error={isSubmitted && !firstName.trim()} placeholder="First Name" value={firstName} onChange={setFirstName} className="!w-full"  />
                    {
                        isSubmitted && (!firstName.trim() || !/^[a-zA-Z]+$/.test(firstName)) && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                    }
                </div>
                <div className="w-4/12 flex flex-col">
                    <InputField id={"last-name-input"} placeholder="Last Name" error={isSubmitted && !lastName.trim()} value={lastName} onChange={setLastName} className="!w-full"/>
                    {
                        isSubmitted && (!lastName.trim() || !/^[a-zA-Z]+$/.test(lastName)) && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                    }
                </div>
                {
                    <SelectField id={'gender'} error={isSubmitted && !gender.trim()} placeholder="Gender" value={gender}
                                 types={genderTypes} onChange={(e)=> {
                                     // @ts-ignore
                                     setGender(e);
                    }}/>
                }
            </div>
        </div>
        <div className="space-y-3.5">
            <FieldName label="Date of Birth"/>
            <div className="space-x-7">
                <SelectField id={'dob-date'} error={isSubmitted && !dobDate} placeholder="DD" types={dateTypes} value={dobDate} onChange={(e)=>{
                    // @ts-ignore
                    setDobDate(e);
                }} />
                <SelectField id={'dob-month'} error={isSubmitted && !dobMonth} placeholder="MM" types={monthTypes} value={dobMonth} onChange={(e)=>{
                    // @ts-ignore
                    setDobMonth(e);
                }} />
                <SelectField id={'dob-year'}  error={isSubmitted && !dobYear} placeholder="YYYY" types={pastYearsType} value={dobYear} onChange={(e)=> {
                    // @ts-ignore
                    setDobYear(e);
                }} />
            </div>
        </div>
        <div className="space-y-3.5">
            <FieldName label="Passport Number and Nationality"/>
            <div className="space-x-7 flex">
                <div className="w-4/12 flex flex-col">
                    <InputField id={"passport-number-input"} error={isSubmitted && !passNum.trim()} placeholder="Passport Number" value={passNum} onChange={setPassNum} className="!w-full"/>
                    {
                        isSubmitted && !passNum.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                    }
                </div>
                <SelectField id={'nationality'} error={isSubmitted && !nationality.trim()} placeholder="Nationality (e.g. India)" types={data.countryList} value={nationality} onChange={(e)=>{
                    // @ts-ignore
                    setNationality(e);
                }} className="w-4/12" />
            </div>
        </div>
        <div className="space-x-7 flex">
            <div className="w-4/12 space-y-3.5">
                <FieldName label="Issue Country"/>
                <SelectField id={'passport-country'} error={isSubmitted && !issueCountry.trim()} placeholder="Passport Issue Country Name " types={data.countryList} value={issueCountry} onChange={(e)=>{
                    // @ts-ignore
                    setIssueCountry(e);
                }} className="!w-full" />
            </div>
            <div className="w-4/12 space-y-3.5">
                <FieldName label={"Expiry Date"}/>
                <div className="flex justify-between">
                    <SelectField id={'exp-date'} error={isSubmitted && !expDate} placeholder="DD" types={dateTypes} value={expDate} onChange={(e)=>{
                        // @ts-ignore
                        setExpDate(e);
                    }} />
                    <SelectField id={'exp-month'} error={isSubmitted && !expMonth} placeholder="MM" types={monthTypes} value={expMonth} onChange={(e)=>{
                        // @ts-ignore
                        setExpMonth(e)
                    }} />
                    <SelectField id={'exp-year'} error={isSubmitted && !expYear} placeholder="YYYY" types={futureYearsType} value={expYear} onChange={(e)=>{
                        // @ts-ignore
                        setExpYear(e)
                    }} />
                </div>
            </div>
            <div className="flex flex-1 flex-row-reverse items-end">
                <button className="border border-primary text-sm font-bold text-primary px-11 py-2 rounded-5 hover:bg-primary hover:text-white" onClick={onSave} id={(!props.data.isSaved ? 'Save details' : 'Update details' ).replace(" ","-")}>{ !props.data.isSaved ? 'Save details' : 'Update details' }</button>
            </div>
        </div>
    </div>
};
export default TravellerForm;
