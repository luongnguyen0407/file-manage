import OneField from "../../components/OneField";
import InputValidate from "../../components/InputValidate";
import Button from "../../components/Button";
const Create = () => {
  return (
    <>
      <OneField>
        <label
          htmlFor="first_name"
          className="block text-gray-700 font-bold mb-2"
        >
          First Name
        </label>
        <InputValidate name="first_name" placeholder="First Name" />
      </OneField>
      <OneField>
        <label
          htmlFor="last_name"
          className="block text-gray-700 font-bold mb-2"
        >
          Last Name
        </label>
        <InputValidate name="last_name" placeholder="Last Name" />
      </OneField>
      <OneField>
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <InputValidate name="email" type="email" placeholder="Email" />
      </OneField>
      <Button>Create</Button>
    </>
  );
};

export default Create;
