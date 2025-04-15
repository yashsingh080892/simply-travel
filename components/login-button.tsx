import React, {useEffect, useState} from "react";
import 'react-intl-tel-input/dist/main.css';
import {Modal} from "@mui/material";
import Logout from "./logout";
import Login from "./login";
import Signup from "./signup";
import DropDown from "./dropdown";
import Router from "next/router";
import {assetPrefix} from "../next.config";
import ImageWithAssetPrefix from "./image/image";
const LoginButton = () => {

    const [loginButtonData, setLoginButtonData] = useState({
        username:"",
        openModal: false,
        isLoggedIn: false,
        showSignup: false,
    });

    const [eventAdded, setEventAdded] = useState(false);

    const [sessionToggle, setSessionToggle] = useState(true);
    useEffect(() => {
        let userName = sessionStorage.getItem("username");
        // @ts-ignore
        setLoginButtonData({...loginButtonData, username: userName, isLoggedIn: userName? true:false});
        setTimeout(()=>{
            setSessionToggle(!sessionToggle);
        }, 1000)
    }, [sessionToggle]);
    function handleModalOpen() {
        setLoginButtonData({ ...loginButtonData, openModal:true});
    }

    function handleModalClose(){
        setShowSignup(false);
        let userName = sessionStorage.getItem("username");
        // @ts-ignore
        setLoginButtonData({ ...loginButtonData, username: userName, isLoggedIn: userName? true:false , openModal:false,showSignup: false});
    }

    function setShowSignup(showSignup: boolean){
        setLoginButtonData({...loginButtonData, showSignup:showSignup});
    }

    const [openDropdown, setOpenDropdown] = useState(false);
    return (
        <>
            {loginButtonData.username?.length>0?
                <>

                    <DropDown
                        open={openDropdown}
                        anchorOrigin={{vertical:'bottom', horizontal:'left'}}
                        transformOrigin={{vertical: 'top', horizontal: 'left'}}
                        trigger={
                            <button className="login-btn flex" onClick={()=>setOpenDropdown(true)} id={'login-signup'}>
                                <div className="flex mt-0.5">
                                    <div className="my-auto">{loginButtonData.username}</div>
                                    <div className="pl-2 relative top-1">
                                        <ImageWithAssetPrefix height={20} width={12} src={assetPrefix+"/down-arrow-white.svg"} alt=""/>
                                    </div>
                                </div>
                            </button>
                        }
                        content={
                            <div className="text-secondary p-5 pr-20 text-base font-medium">
                                <div className="flex pb-5 cursor-pointer" onClick={()=> {
                                    Router.push({pathname: "/ticket_cancellation"});
                                    setOpenDropdown(false);
                                }} id={'my-bookings'}>
                                    <div className="pr-2 h-5">
                                        <ImageWithAssetPrefix height={20} width={20} src={assetPrefix+"/bookings.svg"} alt="" className="pr-2 h-5"/>
                                    </div>
                                    <div className="my-auto">My Bookings</div>
                                </div>
                                <div>
                                    <div className="flex pb-5 cursor-pointer" onClick={()=> {
                                        Router.push({pathname: "/apikeys"});
                                        setOpenDropdown(false);
                                    }} id={'api-keys'}>
                                        <div className="pr-2 h-5">
                                            <ImageWithAssetPrefix height={20} width={20} src={assetPrefix+"/key.svg"} alt="" className="pr-2 h-5"/>
                                        </div>
                                        <div className="my-auto">API Tokens</div>
                                    </div>
                                </div>
                                <div className="flex cursor-pointer"
                                     onClick={()=>{
                                         setOpenDropdown(false);
                                         handleModalOpen();
                                     }} id={'logout'}>
                                    <div className="pl-1 pr-2 h-4">
                                        <ImageWithAssetPrefix height={16} width={16} src={assetPrefix+"/logout.svg"} alt="" className="pr-2 h-4"/>
                                    </div>
                                    <div className="my-auto">Logout</div>
                                </div>
                            </div>
                        }
                    />
                </> :
                <button className="login-btn flex" onClick={() => {setLoginButtonData({...loginButtonData,openModal: true }); }} id={'login-signup'}>
                <div className="my-auto">Login or Sign Up</div>
                </button>}
            <Modal
                open={loginButtonData.openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <div className={'h-screen flex'}>
                    <div className={`drop-shadow-xl rounded-2xl ${loginButtonData.showSignup?'signup-form':'login-form'} m-auto`}>
                        <div className="absolute right-4 top-4">
                            <ImageWithAssetPrefix height={12} width={12} src={assetPrefix+"/close-icon.svg"} alt="" onClick={handleModalClose} id={'close-svg-popUp'} style={{cursor:"pointer"}}/>
                        </div>
                        {loginButtonData.isLoggedIn ?
                        <Logout handleLogOutClose={handleModalClose}/>:
                        <>{loginButtonData.showSignup? <Signup handleLoginClose={handleModalClose} setShowSignup={setShowSignup}/>: <Login handleLoginClose={handleModalClose} setShowSignup={setShowSignup}/>}</>
                        }
                    </div>
                </div>
            </Modal>
        </>

    )
}

export default LoginButton;

