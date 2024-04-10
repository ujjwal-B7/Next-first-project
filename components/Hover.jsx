import React from "react";

const Hover = ({ message, children }) => {
  return (
    <>
      <div className="primary-bg p-1 h-7 gap-2 rounded cursor-pointer relative hover_here">
        {children}
        <span className="hidden primary-bg absolute -top-7 w-[5.1rem] p-1 text-center  rounded right-0 text-xs children">
          {message}
        </span>
      </div>
    </>
  );
};

export default Hover;
