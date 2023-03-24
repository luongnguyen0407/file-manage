import { Button } from "@material-tailwind/react";
import React from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface FormUpLoadFileProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormUpLoadFile = ({ onSubmit, onChange }: FormUpLoadFileProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-x-2 items-center">
      <input type="file" onChange={onChange} />
      <Button
        variant="gradient"
        className="flex items-center gap-3"
        type="submit"
      >
        <AiOutlineCloudUpload strokeWidth={2} className="h-5 w-5" /> Upload
        Files
      </Button>
    </form>
  );
};

export default FormUpLoadFile;
