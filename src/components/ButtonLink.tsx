import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: string;
  to: string;
  className?: string;
}
const ButtonLink = ({ children, to, className = "" }: ButtonProps) => {
  return (
    <Link to={to}>
      <Button className={`${className}`}>{children}</Button>
    </Link>
  );
};
export default ButtonLink;
