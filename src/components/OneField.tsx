interface OneFieldProps {
  children: React.ReactNode;
}

const OneField = ({ children }: OneFieldProps) => {
  return <div className="flex flex-col gap-1 mb-2">{children}</div>;
};

export default OneField;
