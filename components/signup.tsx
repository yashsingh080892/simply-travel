import {ErrorMessage, FieldName} from "./traveler-form";
import React, {useState} from "react";
import SelectField from "./select";
import IntlTelInput from "react-intl-tel-input";
import {Checkbox, FormControl, Radio, RadioGroup} from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import {default as WrapperRadioGroup} from "./radio-button-group";
import {default as WrapperCheckbox} from "../components/forms/checkbox";
import {InputFieldProps} from "../interfaces/input-field-props";
import SignupService from "../services/sign-up.service";
import {SignUp} from "../models/sign-up.model";
import {LoginModel} from "../models/login.model";
import UserService from "../services/userService";
import {Modal} from "@mui/material";



export const InputField = (props:InputFieldProps) => {
    const onChange = (event:any) => {
        props.onChange(event.target.value);
    };
    return <input className={`h-fit border appearance-none ${props.error?'border-ts-red':'border-grey'} focus:border-primary py-2 px-3.5 rounded-5 outline-none text-sm `+props.className} onChange={onChange} placeholder={props.placeholder} type={props.type||'text'} value={props.value} id={props.id}/>
};
const dateTypes = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
const monthTypes = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const thisYear = (new Date()).getFullYear();
let pastYearsType = [
    '1970', '1971', '1972', '1973', '1974',
    '1975', '1976', '1977', '1978', '1979',
    '1980', '1981', '1982', '1983', '1984',
    '1985', '1986', '1987', '1988', '1989',
    '1990', '1991', '1992', '1993', '1994',
    '1995', '1996', '1997', '1998', '1999',
    '2000', '2001', '2002', '2003', '2004',
    '2005', '2006', '2007', '2008', '2009',
    '2010'
];

const Signup = (props:any) => {
    let [isSubmitted,setSubmitted] = useState(false);
    let [firstName,setFirstName] = useState("");
    let [lastName,setLastName] = useState("");
    let [dobDate,setDobDate] = useState("01");
    let [dobMonth,setDobMonth] = useState("01");
    let [dobYear,setDobYear] = useState("2000");
    let [passNum,setPassNum] = useState("");
    let [email,setEmail] = useState("");
    let [mobile, setMobile] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [profilePicture, setProfilePicture] = useState("");
    let [preferredAirline, setPreferredAirline] = useState("AIR_ASIA");
    let [preferredFood, setPreferredFood] = useState([1]);
    let [preferredClasses, setPreferredClasses] = useState([1]);
    let [travelFrequency, setTravelFrequency] = useState("Only Vacation")
    let [dob,setDob] = useState("");
    let [countryCode, setCountryCode] = useState("");
    let [showSuccess,setShowSuccess] = useState(false);
    function showSignupDetails() {
        setDob(dobYear+"-"+dobMonth+"-"+dobDate);
        console.log(dob);
        if(signUpData.travelFrequency == "Only Vacation")
            signUpData.travelFrequency="ONLY_VACATION";
        else if(signUpData.travelFrequency == "Business Traveller")
            signUpData.travelFrequency="BUSINESS_TRAVELLER";
        else if (signUpData.travelFrequency == "Travel Enthusiast")
            signUpData.travelFrequency="TRAVEL_ENTHUSIAST";
        console.log(signUpData);
        SignupService.add(signUpData).then(r => console.log(r));
        setSubmitted(true);
        // sessionStorage.setItem("username", firstName + " " + lastName);
        // sessionStorage.setItem("pass", password);
        props.setShowSignup(false);
        setShowSuccess(true);
        props.handleLoginClose();
    }

    function togglePreferredFood(value:boolean, number: number) {
        let preferredFoodArray = preferredFood;
        let index = preferredFoodArray.indexOf(number);
        if(value) {
            if(index == -1) {
                preferredFoodArray.push(number);
                setPreferredFood(preferredFoodArray);
            }
        } else {
            if(index == -1) {
                preferredFoodArray.splice(index, 1);
                setPreferredFood(preferredFoodArray);
            }
        }
    }

    function togglePreferredClasses(checked: boolean, number: number) {
        let preferredFoodArray = preferredFood;
        let index = preferredFoodArray.indexOf(number);
        if(checked) {
            if(index == -1) {
                preferredClasses.push(number);
                setPreferredClasses(preferredFoodArray);
            }
        } else {
            if(index == -1) {
                preferredClasses.splice(index, 1);
                setPreferredClasses(preferredFoodArray);
            }
        }
    }

    const [economy, setEconomy] = useState(false);
    const onToggleEconomy = () => setEconomy(prevCount => !prevCount);
    const [business, setBusiness] = useState(false);
    const onToggleBusiness = () => setBusiness(prevCount => !prevCount);

    const [preEconomy, setPreEconomy] = useState(false);
    const onTogglePreEconomy = () => setPreEconomy(prevCount => !prevCount);

    const [firstClass, setFirstClass] = useState(false);
    const onToggleFirstClass = () => setFirstClass(prevCount => !prevCount);

    const [veg, setVeg] = useState(false);
    const onToggleVeg = () => setVeg(prevCount => !prevCount);

    const [nonVeg, setNonVeg] = useState(false);
    const onToggleNonVeg = () => setNonVeg(prevCount => !prevCount);

    const [vegan, setVegan] = useState(false);
    const onToggleVegan = () => setVegan(prevCount => !prevCount);

    const [eggean, setEggean] = useState(false);
    const onToggleEggean = () => setEggean(prevCount => !prevCount);


    const signUpData:SignUp = new SignUp();
    signUpData.firstName = firstName;
    signUpData.lastName = lastName;
    signUpData.email = email;
    signUpData.password = password;
    signUpData.mobileNumber = mobile;
    signUpData.dob = dobYear+"-"+dobMonth+"-"+dobDate;
    signUpData.travelFrequency = travelFrequency;
    signUpData.preferredAirline = preferredAirline;
    signUpData.economy = economy;
    signUpData.business = business;
    signUpData.preEconomy = preEconomy;
    signUpData.firstClass = firstClass;
    signUpData.veg = veg;
    signUpData.nonVeg = nonVeg;
    signUpData.vegan = vegan;
    signUpData.eggean = eggean;
    signUpData.profilePic = profilePicture;

    return (
        <div>
            {!showSuccess?
        <div className="text-secondary space-y-5">
            <div className="w-full text-center">
                <div className="font-xl">Register Account</div>
                {/*<div className="font-base">Already have an account?*/}
                {/*    <a className="text-primary" id={'login-signup'} onClick={props.handleLoginClose}> Login</a></div>*/}
            </div>
            <div className="w-full flex">
                <div className="h-2/3 w-3/5">
                    <div className="space-y-3.5">
                        <FieldName label="Name"/>
                        <div className="space-x-7 flex">
                            <div className="w-4/12 flex flex-col w-1/2">
                                <InputField id={'first-name-signup'} error={isSubmitted && !firstName.trim()} placeholder="First Name" value={firstName} onChange={setFirstName} className="!w-full"/>
                                {
                                    isSubmitted && !firstName.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                                }
                            </div>
                            <div className="w-4/12 flex flex-col w-1/2">
                                <InputField id={'last-name-signup'} placeholder="Last Name" error={isSubmitted && !lastName.trim()} value={lastName} onChange={setLastName} className="!w-full"/>
                                {
                                    isSubmitted && !lastName.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-3.5 w-2/5 pl-10">
                    <FieldName label="Date of Birth"/>
                    <div className="space-x-7">
                        <SelectField id={'dob-date-signup'} error={isSubmitted && !dobDate.trim()} placeholder="DD" types={dateTypes} value={dobDate} onChange={(e)=>{
                            // @ts-ignore
                            setDobDate(e);
                        }} />
                        <SelectField id={'dob-month-signup'} error={isSubmitted && !dobMonth.trim()} placeholder="MM" types={monthTypes} value={dobMonth} onChange={(e)=> {
                            // @ts-ignore
                            setDobMonth(e);
                        }} />
                        <SelectField id={'dob-year-signup'} error={isSubmitted && !dobYear.trim()} placeholder="YYYY" types={pastYearsType} value={dobYear} onChange={(e)=>{
                            // @ts-ignore
                            setDobYear(e);
                        }} />
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className="h-2/3 w-3/5">
                    <div className="space-y-3.5">
                        <div className="space-x-7 flex">
                            <div className="w-4/12 flex flex-col w-1/2 space-y-3.5">
                                <FieldName label="Email address"/>
                                <InputField id={'email-address-signup'} error={isSubmitted && !email.trim()} placeholder="Email address" value={email} onChange={setEmail} className="!w-full"/>
                                {
                                    isSubmitted && !email.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                                }
                            </div>
                            <div className="w-4/12 flex flex-col w-1/2 space-y-3.5">
                                <FieldName label="Mobile Number"/>
                                <div>
                                    <div className="flag-prefix -mt-2">
                                        <IntlTelInput
                                            containerClassName="intl-tel-input"
                                            inputClassName="form-control"
                                        />
                                    </div>
                                    <input placeholder={"Enter your mobile number"} type={"tel"} className={(isSubmitted && !mobile.trim()?"warning-border mb-1 ":"mb-8 ")+"pl-14 text-sm w-full border border-grey rounded-5 py-2"}
                                           value={mobile}
                                           onChange={(e)=> setMobile(e.currentTarget.value)}
                                            id={'mobile-number-signup'}/>
                                    {
                                        isSubmitted && !lastName.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-3.5 w-2/5 pl-10">
                    <div className="flex"><FieldName label="Passport Number"/> <span className="text-base">&nbsp;(optional)</span></div>
                    <div className="space-x-7">
                        <div className="flex flex-col">
                            <InputField id={'passport-no-signup'} error={isSubmitted && !passNum.trim()} placeholder="Passport Number" value={passNum} onChange={setPassNum} className="w-full"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className="space-y-3.5 w-3/5">
                    <FieldName label="Travel Frequency"/>
                    <FormControl className="block">
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Only Vacation"
                            name="radio-buttons-group"
                            value={travelFrequency}
                            onChange={(e, value)=>{ setTravelFrequency(value)}}
                            id={travelFrequency.replace(" ","-")}
                            row>
                            <FormControlLabel value="Only Vacation" control={<Radio defaultChecked/>} label="Only Vacation" id={"only-vacation"} />
                            <FormControlLabel value="Business Traveller" control={<Radio />} label="Business Traveller" id={"business-traveller"} />
                            <FormControlLabel value="Travel Enthusiast" control={<Radio />} label="Travel Enthusiast" id={"travel-enthusiast"}/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="space-y-3.5 w-2/5 pl-10">
                    <FieldName label="Preferred Airlines"/>
                    <WrapperRadioGroup options={[{name:"Air Asia", id:"AIR_ASIA"},
                        {name:"Lufthansa", id:"LUFTHANSA"},
                        {name:"Emirates", id:"EMIRATES"},
                        {name:"Indigo", id:"INDIGO"},
                    ]} value={preferredAirline} onValueChange={setPreferredAirline}/>
                </div>
            </div>
            <div className="w-full flex">
                <div className="space-y-3.5 w-3/5">
                    <FieldName label="Preferred Class"/>
                    <FormControlLabel control={<Checkbox id={'economy'} checked={economy} onChange={(value)=>{onToggleEconomy()}} defaultChecked />} label="Economy" />
                    <FormControlLabel control={<Checkbox id={'business'} checked={business} onClick={(value)=>{onToggleBusiness()}} />} label="Business" />
                    <FormControlLabel control={<Checkbox id={'premium-economy'} checked={preEconomy} onChange={(value)=>{onTogglePreEconomy()}} />} label="Premium Economy" />
                    <FormControlLabel control={<Checkbox id={'first-class'} checked={firstClass} onChange={(value)=>{onToggleFirstClass()}} />} label="First Class" />
                </div>
                <div className="space-y-3.5 w-2/5 pl-10">
                    <FieldName label="Preferred Food"/>
                    <div className="flex">
                        <WrapperCheckbox id={1} label={"Veg"}
                                         checked={veg}
                                         onChange={()=>{onToggleVeg()}}
                                         className="text-secondary text-sm"
                        />
                        <WrapperCheckbox id={2} label={"Non-Veg"}
                                         checked={nonVeg}
                                         onChange={()=>{onToggleNonVeg()}}
                                         className="text-secondary text-sm pl-2"
                        />
                        <WrapperCheckbox id={3} label={"Vegan"}
                                         checked={vegan}
                                         onChange={()=>{onToggleVegan()}}
                                         className="text-secondary text-sm pl-2"
                        />
                        <WrapperCheckbox id={4} label={"Eggean"}
                                         checked={eggean}
                                         onChange={()=>{onToggleEggean()}}
                                         className="text-secondary text-sm pl-2"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex">
                <div className="w-3/5 flex space-x-7">
                    <div className="w-1/2 space-y-3.5">
                        <FieldName label="Password" />
                        <InputField id={'password-signup'} error={isSubmitted && !password.trim()} placeholder="Enter Password" value={password} onChange={setPassword} className="!w-full" type={'password'}/>
                        {
                            isSubmitted && !password.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                        }
                    </div>
                    <div className="w-1/2 space-y-3.5">
                        <FieldName label="Confirm Password" />
                        <InputField id={'confirm-password-signup'} error={isSubmitted && !confirmPassword.trim()} placeholder="Re-Enter Password" value={confirmPassword} onChange={setConfirmPassword} className="!w-full" type={'password'}/>
                        {
                            isSubmitted && !confirmPassword.trim() && <ErrorMessage message={"Please fill the valid data"}></ErrorMessage>
                        }
                    </div>
                </div>
                <div className="w-2/5 space-y-3.5 pl-10">
                    <FieldName label="Upload Profile Picture" />
                    <div className="flex">
                        <input className="border-b w-3/5" type="file" id="profilepic" value={profilePicture} onChange={(e)=>setProfilePicture(e.currentTarget.value)}/>
                        <div className="-ml-12 text-xs text-primary mt-2 cursor-pointer" id={'remove-picture'}>Remove</div>
                        <button className="ml-auto ts-t-primary-btn px-10" onClick={()=> {
                            // @ts-ignore
                            document.getElementById("profilepic").click()}} id={'upload-signup'}>Upload</button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center">
                <div className="text-12 text-ts-red">After registering, login to continue</div>
                <div><button className="ts-t-primary-btn px-20 mx-auto" onClick={showSignupDetails} id={'register-signup'}>Register</button></div>
            </div>
        </div>
            :
            <div>
                <div className="text-2xl font-bold pt-7">You have successfully signed up!</div>
                <div className="text-xs font-bold pt-9 pb-4 text-ts-red">Please login to continue</div>
            </div>
            }
        </div>

    )
}
export default Signup;
