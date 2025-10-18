import React from 'react'


export default function Circle() {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 ">
      <svg viewBox="0 0 200 200" className="absolute w-full h-full text-white animate-rotate-slow">
        <defs>
          <path id="circlePath" d="M100,100 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0" />
        </defs>
        <text fontSize="14" fontWeight="bold" className="fill-white" letterSpacing="2.5">
          <textPath href="#circlePath" startOffset="0%">
            MADE • IN • GHANA • SOFTWARE • ENGINEER •
          </textPath>
        </text>
      </svg>

      <div className="flex flex-col justify-center items-center w-16 h-16 rounded-full overflow-hidden shadow-md border border-white">
        <div className="flex flex-col w-full h-full">
          <div className="flex-1 bg-[#ef3340]" />
          <div className="flex-1 bg-[#fcd116] flex items-center justify-center">
            <span className="text-black text-xl">★</span>
          </div>
          <div className="flex-1 bg-[#009739]" />
        </div>
      </div>
    </div>
  );
}