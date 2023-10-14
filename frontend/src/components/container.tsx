import React from "react";

interface Cont {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Cont) => {
  return (
    <div className={`px-5 mb-5 ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Container;
