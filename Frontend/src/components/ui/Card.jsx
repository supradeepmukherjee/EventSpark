import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`bg-[#333333] text-white p-6 rounded-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export default Card;
