import React from "react";

const Banner = () => {

  return (
    <div onClick={()=>{window.open("../", "_blank")}} className="cursor-pointer text-center text-white">
      <div className="text-6xl">DISCOVER</div>
      <div className="text-4xl">the world</div>
    </div>
  )
};


export default Banner;
