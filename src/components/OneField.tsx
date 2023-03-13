import { FC } from "react";

interface OneFieldProps {
  children: React.ReactNode;
}

const OneField: FC<OneFieldProps> = ({ children }) => {
  return <div className="flex flex-col gap-1 mb-2">{children}</div>;
};

export default OneField;
