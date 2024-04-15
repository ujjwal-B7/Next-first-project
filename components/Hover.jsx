import React from "react";

const Hover = ({ message, children, width, color, bg }) => {
  return (
    <>
      <div
        className={`${
          bg ? `secondary-bg` : "primary-bg"
        } p-1 h-7 gap-2 rounded cursor-pointer relative hover_here content`}
      >
        {children}
        <span
          className={`hidden  absolute ${
            color ? `secondary-bg` : "primary-bg"
          } ${
            width ? `w-${width}` : "w-[5.1rem]"
          } p-1 text-center  rounded right-0 -top-7 text-xs children`}
        >
          {message}
        </span>
      </div>
    </>
  );
};

export default Hover;
