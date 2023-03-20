import axiosApi from "../../axios/axiosApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "react-toastify";
import { lazy, useCallback } from "react";
import { FieldValues } from "react-hook-form/dist/types";
import { API } from "../../config/constants";
const Create = lazy(() => import("./Create"));

const CreateContainer = () => {
  const { t } = useTranslation();
  const schema = yup.object({
    email: yup
      .string()
      .email(t("email.invalidFormat") as string)
      .required(t("email.required") as string),
    first_name: yup.string().required(t("first_name.required") as string),
    last_name: yup.string().required(t("last_name.required") as string),
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit } = methods;
  const handleCreate = useCallback(async (data: FieldValues) => {
    await axiosApi.post(`${API.CREATE_USER}`, data);
    toast.success("Create success");
  }, []);
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleCreate)}
          className=" bg-white p-6 rounded-lg shadow-md"
        >
          <Create />
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateContainer;
