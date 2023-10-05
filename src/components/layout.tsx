import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <div className="h-screen flex items-center justify-center">{children}</div>;
};

export default Layout;
