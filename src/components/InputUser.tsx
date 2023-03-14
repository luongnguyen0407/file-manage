import { ReactNode } from "react";
import { InputProps } from "../models/InputType";
import { User } from "../models/User";
import { useController } from "react-hook-form";
const InputUser = ({
  placeholder,
  type = "text",
  control,
  name,
  errors,
}: InputProps<User>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      <input
        {...field}
        className={`border border-gray-400 p-2 rounded-md w-full ${
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

export default InputUser;
