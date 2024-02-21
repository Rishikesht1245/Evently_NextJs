import React from "react";

type Props = {
  children: React.ReactNode;
};
const layout = ({ children }: Props) => {
  return (
    <div className="w-full min-h-screen flex-center bg-primary-50 bg-dotted-pattern bg-cover bg-fixed">
      {children}
    </div>
  );
};
export default layout;
