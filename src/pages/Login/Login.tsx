import OneField from "../../components/OneField";
import Button from "../../components/Button";
import InputValidate from "../../components/InputValidate";
const Login = () => {
  return (
    <>
      <OneField>
        <label htmlFor="email">Email</label>
        <InputValidate name="email" placeholder="Email" />
      </OneField>
      <OneField>
        <label htmlFor="password">Password</label>
        <InputValidate name="password" placeholder="password" type="password" />
      </OneField>
      <Button>Login</Button>
    </>
  );
};

export default Login;
