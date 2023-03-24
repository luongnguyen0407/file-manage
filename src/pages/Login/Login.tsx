import InputValidate from "@components/InputValidate";
import { Checkbox, Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
      <div className="mb-4 flex flex-col gap-6">
        <InputValidate name="email" placeholder="Email" />
        <InputValidate name="password" placeholder="password" type="password" />
      </div>
      <Checkbox
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal"
          >
            I agree the
            <a
              href="#"
              className="font-medium transition-colors hover:text-blue-500"
            >
              &nbsp;Terms and Conditions
            </a>
          </Typography>
        }
        containerProps={{ className: "-ml-2.5" }}
      />
      <Button className="mt-6" fullWidth type="submit">
        Sign In
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?
        <Link
          to={"/register"}
          className="font-medium text-blue-500 transition-colors hover:text-blue-700"
        >
          Register
        </Link>
      </Typography>
    </>
  );
};

export default Login;
