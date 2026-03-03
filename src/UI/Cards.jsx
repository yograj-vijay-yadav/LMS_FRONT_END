import React from 'react';

function Cards  ({children}) {
  return (
    <div className="relative drop-shadow-xl w-4/12 h-8/12 overflow-hidden rounded-xl bg-[#3d3c3d]">
      <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
        {children}
      </div>
      <div className="absolutew w-5/12 h-3/12 bg-white blur-[50px] -left-1/2 -top-1/2" />
    </div>
  );
}

export default Cards;
