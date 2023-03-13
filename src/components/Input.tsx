import { ReactNode } from "react";
import {
  useController,
  FieldValues,
  Control,
  FieldErrors,
} from "react-hook-form";
import { FormValue } from "../pages/Login";

interface InputProps {
  placeholder: string;
  type?: string;
  control: Control<FormValue> | undefined;
  name: "email" | "password";
  errors: FieldErrors<FieldValues>;
}
const Input: React.FC<InputProps> = ({
  placeholder,
  type = "text",
  control,
  name,
  errors,
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      <input
        {...field}
        className={`border border-gray-400 rounded-sm p-2 outline-none ${
          !!errors[name] ? "border-red-400" : ""
        }`}
        placeholder={placeholder}
        type={type}
      />
      {!!errors[name] && (
        <p className="text-xs text-red-300">
          {errors[name]?.message as ReactNode}
        </p>
      )}
    </>
  );
};

export default Input;
