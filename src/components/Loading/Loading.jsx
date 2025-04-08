import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px] flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-amber-500 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-.5s]"></div>
    </div>
  );
};

export default Loading;
