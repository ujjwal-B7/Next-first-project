import React from "react";

const Prompt = ({ data }) => {
  return (
    <div className="w-[15rem] secondary-bg p-4 rounded">
      <p>{data.prompt}</p>
      <h1 className="text-orange-400">{data.tag}</h1>
    </div>
  );
};

export default Prompt;
