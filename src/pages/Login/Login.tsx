import OneField from "../../components/OneField";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { FormLoginValue } from "../../models/AuthType";
interface LoginProps {
  control: Control<FormLoginValue> | undefined;
  errors: FieldErrors<FieldValues>;
}
const Login = ({ control, errors }: LoginProps) => {
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
