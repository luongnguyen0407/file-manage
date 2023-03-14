import OneField from "../../components/OneField";
import InputUser from "../../components/InputUser";
import Button from "../../components/Button";
import { User } from "../../models/User";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
interface createProps {
  control: Control<User> | undefined;
  errors: FieldErrors<FieldValues>;
}
const Create = ({ control, errors }: createProps) => {
  return (
    <>
      <OneField>
        <label
          htmlFor="firstName"
          className="block text-gray-700 font-bold mb-2"
        >
          First Name
        </label>
        <InputUser
          errors={errors}
          control={control}
          name="first_name"
          placeholder="First Name"
        />
      </OneField>
      <OneField>
        <label
          htmlFor="lastName"
          className="block text-gray-700 font-bold mb-2"
        >
          Last Name
        </label>
        <InputUser
          errors={errors}
          control={control}
          name="last_name"
          placeholder="Last Name"
        />
      </OneField>
      <OneField>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <InputUser
          errors={errors}
          control={control}
          name="email"
          type="email"
          placeholder="Email"
        />
      </OneField>
      <Button>Create</Button>
    </>
  );
};

export default Create;
