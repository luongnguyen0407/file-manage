interface HeadingProps {
  children: string;
}
const Heading = ({ children }: HeadingProps) => {
  return <h3 className="text-center text-2xl font-bold">{children}</h3>;
};

export default Heading;
