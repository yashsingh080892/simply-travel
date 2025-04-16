import React from "react";

const Logout = (props:any) => {
    function handleLogOut() {
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("pass");
        sessionStorage.removeItem("jwt_token");
        props.handleLogOutClose();
    }
    return (
        <>
            <div className="text-2xl font-bold pt-7">Are you sure?</div>
            <div className="text-xs font-bold pt-9 pb-4 text-ts-red">You need to Login to book a ticket</div>
            <button className={"ts-t-primary-btn mt-6 px-4"} onClick={handleLogOut} id={'logout-popUp'}>Logout</button>
        </>
    )
}
export default Logout;
