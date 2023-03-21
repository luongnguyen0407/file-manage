interface HeadingProps {
  children: string;
  className?: string;
}
const Heading = ({ children, className = "" }: HeadingProps) => {
  return (
    <h3 className={`text-center text-2xl font-bold ${className}`}>
      {children}
    </h3>
  );
};

export default Heading;
