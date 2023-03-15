import Heading from "../../components/Heading";
import axiosApi from "../../axios/axiosApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { MyContextValue } from "../../models/ContextType";
import { lazy, useContext } from "react";
import { FieldValues } from "react-hook-form/dist/types";
import { AuthContext } from "../../context/auth-context";
import { API, LOCAL_STORAGE_KEY, PAGE } from "../../config/constants";
const Login = lazy(() => import("./Login"));
const LoginContainer = () => {
  const { t } = useTranslation();
  const { setUserInfo } = useContext(AuthContext) as MyContextValue;
  const [, setToken] = useLocalStorage<string>(LOCAL_STORAGE_KEY.TOKEN, "");
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email(t("email.invalidFormat") as string)
      .required(t("email.required") as string),
    password: yup
      .string()
      .required(t("password.required") as string)
      .min(8, t("password.short") as string)
      .max(16, t("password.long") as string),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const handleSubmitLogin = async (data: FieldValues) => {
    try {
      const res = await axiosApi.post(API.LOGIN, data);
      setUserInfo(res.data);
      setToken(res.data.token);
      toast.success("Logic success");
      navigate(PAGE.HOME);
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <Heading>Login</Heading>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitLogin)} className="mt-3">
          <Login />
        </form>
      </FormProvider>
    </>
  );
};

export default LoginContainer;
