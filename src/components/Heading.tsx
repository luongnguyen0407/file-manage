import { FC } from "react";

interface HeadingProps {
  children: string;
}
const Heading: FC<HeadingProps> = ({ children }) => {
  return <h3 className="text-center text-2xl font-bold">{children}</h3>;
};

export default Heading;
