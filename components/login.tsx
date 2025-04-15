import RadioGroup from "./radio-button-group";
import IntlTelInput from "react-intl-tel-input";
import React, {useState} from "react";
import {assetPrefix} from "../next.config";
import ImageWithAssetPrefix from "./image/image";
import UserService from "../services/userService";
import {Users} from "../models/users.model";
import {LoginModel} from "../models/login.model";

let initialLoginData = {
    chosenOperation: "",
    options: [{id: 1, name: "Email"}, {id: 2, name: "Mobile Number"}],
    value: 1,
    email: "",
    invalidEmail: false,
    mobile: "",
    invalidMobile: false,
    password: "",
    otp: ["", "", "", ""]
}
const Login = (props:any) => {
    let loginData = initialLoginData;
    if(props.showGuest){
        loginData = {...loginData,chosenOperation:"Login",value:2};
    }
    const [myLoginData, setLoginData] = useState(loginData);
    const [incorrectLogin,setIncorrectLogin] = useState(false);
    function validateEmail(event?: React.ChangeEvent<HTMLInputElement>) {
        let email:string = event?.currentTarget.value || myLoginData.email;
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = email.length != 0 && re.test(String(email).toLowerCase())
        setLoginData({...myLoginData,...{invalidEmail: !valid, email: email}});
        return valid;
    }

    function validateMobileNumber(event?: React.ChangeEvent<HTMLInputElement>) {
        let mobileNumber:string = event?.currentTarget.value || myLoginData.mobile;
        const re = /^\D*(?:\d){1,}$/;
        let valid = mobileNumber.length != 0 && re.test(String(mobileNumber).toLowerCase()) && mobileNumber.length> 0;
        setLoginData({...myLoginData,invalidMobile: !valid, mobile: mobileNumber});
        return valid;
    }

    function validateInput() {
        return myLoginData.value == myLoginData.options[0].id? validateEmail() : validateMobileNumber();
    }

    function login() {
        const login = new LoginModel();
        login.email = myLoginData.email;
        login.password = myLoginData.password;
        UserService.getToken(login).then(r => {
            // @ts-ignore
            if(r?.jwtToken==null){
                setIncorrectLogin(true);
                console.log("if");
            }
            else
            {
                // @ts-ignore
                sessionStorage.setItem("jwt_token", r?.jwtToken)
                // @ts-ignore
                sessionStorage.setItem("id",r?.userId)
                sessionStorage.setItem("username", myLoginData.email.length > 0 ?  myLoginData.email : myLoginData.mobile);
                console.log(r)
                console.log("else")
                handleLoginClose();
            }
            console.log(r)
        });

        // @ts-ignore
        // @ts-ignore
        // sessionStorage.setItem("pass", myLoginData.password);
    }

    const handleLoginClose = () => {
        props.handleLoginClose();
        setLoginData(initialLoginData);
    };

    const handleKeyPress = (e:any) => {
        if (e.keyCode === 13) {
            validateInput()? setLoginData({...myLoginData, chosenOperation: "Continue"}) : ""}
    };

    const handleKeyPressPassword = (e:any) => {
        if (e.keyCode === 13) {
            login();
        }
    };

    return (
        <>
            <div className={"font-bold text-xl mb-9 text-neutral-600"+ (props.showGuest ?" mt-8": "")}>{myLoginData.chosenOperation == ""? "Do you want to": props.showGuest? "Login as Guest":"Login"}</div>
        {myLoginData.chosenOperation == ""?
            <div>
                <button className={"ts-t-primary-btn w-full mb-7 mt-3"}
                        onClick={()=> setLoginData({...myLoginData, chosenOperation:"Login" })} id={'login-popUp'}>Login</button>
                <div className={"my-auto text-xl font-bold text-neutral-600"}>or</div>
                <button className={"ts-t-primary-btn w-full mt-auto mt-7"}
                        onClick={()=> {
                            setLoginData({...myLoginData, chosenOperation:"Signup" })
                            props.setShowSignup(true);
                        }}
                id={'signUp-popUp'}>Signup</button>
            </div>
            :
            <div>  {myLoginData.chosenOperation != "Continue" ?
                <div>
                    {!props.showGuest &&
                        <RadioGroup options={myLoginData.options} value={myLoginData.value} radioGroupName="logInType"
                                    onValueChange={(value: any) => setLoginData({...myLoginData, value: value})}
                                    className={'py-1 mb-1'} id={props.id}></RadioGroup>
                    }
                    {myLoginData.value == myLoginData.options[0].id ?
                        <div>
                            <input placeholder={"Enter your email address"} type={"email"} className={(myLoginData.invalidEmail?"warning-border mb-1 ":"mb-8 ")+"pl-2 text-xs w-full mt-2"}
                                   value={myLoginData.email}
                                   onKeyUp={handleKeyPress}
                                   autoFocus={true}
                                   onChange={(e:any) => setLoginData({...myLoginData,email: e.currentTarget.value})}
                                   required
                                    id={'email-address-login'}/>
                            <div className={myLoginData.invalidEmail? 'text-red-500 text-xs text-left mb-3':'hidden'}> Enter a valid Email </div>
                        </div>
                        :
                        <div>
                            <div className={"flag-prefix"}>
                                <IntlTelInput

                                    containerClassName="intl-tel-input"
                                    inputClassName="form-control"
                                />
                            </div>
                            <input placeholder={"Enter your mobile number"} type={"tel"} className={(myLoginData.invalidMobile?"warning-border mb-1 ":"mb-8 ")+"pl-14 text-xs w-full mt-2"}
                                   value={myLoginData.mobile}
                                   onChange={(e:any)=> myLoginData.invalidMobile? validateMobileNumber(e):setLoginData({...myLoginData,mobile: e.currentTarget.value})}
                                   required minLength={10}
                                    id={'mobile-number'}/>
                            <div className={myLoginData.invalidMobile? 'text-red-500 text-xs text-left mb-3':'hidden'}> Enter a valid Mobile Number </div>
                        </div>
                    }
                    <button className={"ts-t-primary-btn w-full mb-2"}
                            onClick={() => {validateInput()? setLoginData({...myLoginData, chosenOperation: "Continue"}) : ""}} id={'continue'}>Continue
                    </button>
                    {
                        !props.showGuest &&
                        <>
                        <div className={"mb-2 text-xl font-bold text-neutral-600"}>or</div>
                        <button className={"ts-t-secondary-btn w-full text-sm flex justify-center font-normal"}
                        onClick={() => setLoginData({...myLoginData, chosenOperation: "Google"})} id={'login-google'}>
                        <div className="flex my-auto pr-2">
                            <ImageWithAssetPrefix height={20} width={20} src={assetPrefix+"/google-icon.svg"} alt="" className="inline pr-3 my-auto"/>
                        </div>
                        <span className={"my-auto"}>Login with Google</span>
                        </button>
                        </>
                    }
                </div> :
                <div>
                    {myLoginData.value == 1 ?
                        <>
                            <div className={"text-left mb-6"}>
                                <label className={"ts-t-label"}>Enter your Password</label>
                                <input placeholder={"Enter password"} type={"password"} className={"pl-2 text-xs w-full mt-3"}
                                       onChange={ (e:any) => setLoginData({...myLoginData, password: e.currentTarget.value}) }
                                       value={myLoginData.password}
                                       onKeyUp={handleKeyPressPassword}
                                       autoFocus={true}
                                       required/>
                                <div className={incorrectLogin? 'text-red-500 text-xs text-left mb-3':'hidden'}> Unauthorised Access </div>
                            </div>
                            <button className="ts-t-primary-btn w-full disabled:opacity-75 disabled:cursor-not-allowed"
                                    id={"submit"}
                                    disabled={myLoginData.password.length==0}
                                    onClick={login}>Submit</button>
                        </> :
                        <>
                            <div className={"text-left"}>
                                <label className={"ts-t-label w-full mr-auto"}>Enter the OTP sent to your mobile number</label>
                                <div className={"otp-inputs mt-3"}>
                                    <input type="text" onChange={(e)=> {myLoginData.otp[0] = e.currentTarget.value;setLoginData({...myLoginData,otp: [...myLoginData.otp]})}} maxLength={1} id={'otp-1'}/>
                                    <input type="text" onChange={(e)=> {myLoginData.otp[1] = e.currentTarget.value;setLoginData({...myLoginData,otp: [...myLoginData.otp]})}} maxLength={1} id={'otp-2'}/>
                                    <input type="text" onChange={(e)=> {myLoginData.otp[2] = e.currentTarget.value;setLoginData({...myLoginData,otp: [...myLoginData.otp]})}} maxLength={1} id={'otp-3'}/>
                                    <input type="text" onChange={(e)=> {myLoginData.otp[3] = e.currentTarget.value;setLoginData({...myLoginData,otp: [...myLoginData.otp]})}} maxLength={1} id={'otp-4'}/>
                                </div>


                            </div>
                            <button className="ts-t-primary-btn w-full mt-6 disabled:opacity-75 disabled:cursor-not-allowed"
                                    disabled={myLoginData.otp?.join("").length != 4}
                                    onClick={login}
                                    id={'submit-btn'}>Submit</button>
                        </>
                    }

                </div>
            }
            </div>
        }
        </>
    )
}
export default Login;
