import { FC } from "react";

interface ButtonProps {
  children: string;
}
const Button: FC<ButtonProps> = ({ children }) => {
  return (
    <button className="text-white rounded-sm bg-purple-300 px-3 py-2 inline-block mx-auto ">
      {children}
    </button>
  );
};

export default Button;
