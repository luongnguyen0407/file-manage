import { ReactNode } from "react";
import { useController, useFormContext } from "react-hook-form";
interface InputProps {
  placeholder: string;
  type?: string;
  name: string;
}

const InputValidate = ({ placeholder, type = "text", name }: InputProps) => {
  const { formState, control } = useFormContext();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <>
      <input
        {...field}
        className={`border border-gray-400 p-2 rounded-md w-full outline-none ${
          !!errors[name] ? "border-red-400" : ""
        }`}
        placeholder={placeholder}
        type={type}
        id={name}
      />
      {!!errors[name] && (
        <p className="text-xs text-red-300">
          {errors[name]?.message as ReactNode}
        </p>
      )}
    </>
  );
};

export default InputValidate;
