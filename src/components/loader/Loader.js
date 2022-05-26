import React from "react";
// import Lottie from "react-lottie";
import sandClock from "../../assets/img/Loader.json";

export default function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: sandClock,
    
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
     
    >
      {/* <Lottie options={defaultOptions} height={200} width={200} /> */}
    </div>
  );
}
