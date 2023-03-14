import { Control, FieldErrors, FieldValues } from "react-hook-form";

export interface InputProps<T extends FieldValues> {
  placeholder: string;
  type?: string;
  control: Control<T> | undefined;
  name: keyof T;
  errors: FieldErrors<T>;
}
