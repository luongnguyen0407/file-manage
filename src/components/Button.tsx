interface ButtonProps {
  children: string;
  type?: "button" | "submit" | "reset" | undefined;
}
const Button = ({ children, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="text-white rounded-sm bg-purple-300 px-3 py-2 inline-block mx-auto "
    >
      {children}
    </button>
  );
};
export default Button;
