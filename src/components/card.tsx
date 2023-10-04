import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => {
  return <div className="h-screen flex items-center justify-center">{children}</div>;
};

export default Card;
