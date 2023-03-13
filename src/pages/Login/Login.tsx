import Button from "../../components/Button";
import Input from "../../components/Input";
import OneField from "../../components/OneField";
import { FieldValues, Control, FieldErrors } from "react-hook-form";
import { FormValue } from "./LoginContainer";
interface InputProps {
  control: Control<FormValue> | undefined;
  errors: FieldErrors<FieldValues>;
}
const Login = ({ control, errors }: InputProps) => {
  return (
    <>
      <OneField>
        <label htmlFor="">Email</label>
        <Input
          name="email"
          type="email"
          control={control}
          placeholder="email"
          errors={errors}
        />
      </OneField>
      <OneField>
        <label htmlFor="">Password</label>
        <Input
          name="password"
          control={control}
          placeholder="password"
          type="password"
          errors={errors}
        />
      </OneField>
      <Button>Login</Button>
    </>
  );
};

export default Login;
