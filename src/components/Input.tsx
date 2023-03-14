import { ReactNode } from "react";
import { useController } from "react-hook-form";
import { FormLoginValue } from "../models/AuthType";
import { InputProps } from "../models/InputType";
import { User } from "../models/User";
const Input = ({
  placeholder,
  type = "text",
  control,
  name,
  errors,
}: InputProps<FormLoginValue>) => {
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
