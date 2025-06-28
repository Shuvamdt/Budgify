import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const box1 = useRef();
  const box2 = useRef();
  const box3 = useRef();
  const box4 = useRef();
  useGSAP(() => {
    gsap.to(box1.current, {
      rotate: 360,
      scale: 1.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });
    gsap.from(box2.current, {
      rotate: -360,
      scale: 1.5,
      duration: 3,
      repeat: -1,
      yoyo: true,
    });
    gsap.to(box3.current, {
      x: -1400,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
    gsap.from(box4.current, {
      x: -950,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
  });
  return (
    <div>
      <div className="flex flex-col justify-center px-4 py-4 mx-2 relative overflow-x-hidden overflow-y-hidden">
        <div
          ref={box1}
          className="h-15 w-15 bg-[#D00000] absolute hidden sm:flex sm:left-125 md:left-30 top-40"
        ></div>
        <div
          ref={box2}
          className="h-15 w-15 bg-[#03071E] absolute hidden sm:flex sm:left-125 md:left-50 top-50"
        ></div>
        <h1 className="font-1 w-70 sm:w-auto text-l mx-5 sm:my-5 sm:py-5 text-5xl sm:text-6xl lg:text-7xl md:text-end z-1">
          Manage Your Money,
          <br />{" "}
          <span className="text-[#D00000] font-italic">Effortlessly</span>
        </h1>
        <p className="font-1 text-xs md:text-lg md:text-end px-5 py-5 sm:py-2">
          This is a financial management system that helps you <br /> easily
          manage your earnings and savings.
        </p>
        <div className="flex flex-col justify-center items-end">
          <div className="h-25 sm:h-15 lg:h-20 w-175 md:w-180 absolute flex justify-center items-end top-5 sm:top-16 lg:top-14 overflow-hidden">
            <div
              ref={box3}
              className="h-25 sm:h-15 lg:h-20 w-175 md:w-180 bg-[#D00000] absolute flex justify-center items-end top-0 sm:top-0 left-180"
            ></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end">
          <div className="h-15 sm:h-15 lg:h-20 w-150 md:w-100 absolute flex justify-center items-end top-29 sm:top-30.5 md:top-31 lg:top-34 right-26 sm:right-70 md:right-4 overflow-x-hidden">
            <div
              ref={box4}
              className="h-15 sm:h-15 lg:h-20 w-150 md:w-90 bg-[#03071E] absolute flex justify-center items-end top-0 sm:top-0 left-150 md:left-150"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
