import { ReactNode } from "react";
import { Input } from "@material-tailwind/react";
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
      <Input
        {...field}
        type={type}
        id={name}
        label={placeholder}
        error={!!errors[name]}
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
