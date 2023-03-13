import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import OneField from "../components/OneField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { toast } from "react-toastify";
import axiosApi from "../axios/axiosApi";
import { MyContextValue, AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
export type FormValue = {
  email: string;
  password: string;
};
const Login = () => {
  const { setUserInfo } = useContext(AuthContext) as MyContextValue;
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email("Định dạng email không đúng")
      .required("Bạn chưa nhập email"),
    password: yup
      .string()
      .min(8, "Mật khẩu quá ngắn ( > 8)")
      .max(16, "Mật khẩu quá dài")
      .required("Bạn chưa nhập mật khẩu"),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValue>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const handleSubmitLogin = async (data: FormValue) => {
    console.log("data: ", data);
    try {
      const res = await axiosApi.post("/login", data);
      setUserInfo(res.data);
      toast.success("Logic success");
      navigate("/");
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <Heading>Login</Heading>
      <form onSubmit={handleSubmit(handleSubmitLogin)} className="mt-3">
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
      </form>
    </>
  );
};

export default Login;
