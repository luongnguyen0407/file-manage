import axiosApi from "../../axios/axiosApi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { User } from "../../models/User";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { lazy, useCallback, useEffect } from "react";
import { API, PAGE } from "../../config/constants";
const Update = lazy(() => import("./Update"));

const UpdateContainer = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const schema = yup.object({
    email: yup
      .string()
      .email(t("email.invalidFormat") as string)
      .required(t("email.required") as string),
    first_name: yup.string().required(t("first_name.required") as string),
    last_name: yup.string().required(t("last_name.required") as string),
  });
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<User>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  useEffect(() => {
    if (!id) navigate(PAGE.HOME);
    (async () => {
      try {
        const { data } = await axiosApi.get(`${API.SINGLE_USER}/${id}`);
        reset(data.data);
      } catch (error) {
        console.log("error: ", error);
        toast.error("Error");
      }
    })();
  }, [id]);
  const handleUpdate = useCallback(async (data: User) => {
    try {
      await axiosApi.put(`${API.UPDATE_USER}/${id}`, data);
      toast.success("Update success");
    } catch (error) {
      console.log("error: ", error);
      toast.error("Error");
    }
  }, []);
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleUpdate)}
        className=" bg-white p-6 rounded-lg shadow-md"
      >
        <Update errors={errors} control={control}></Update>
      </form>
    </div>
  );
};

export default UpdateContainer;
