import { Option, Select } from "@material-tailwind/react";
import { FileFormat } from "@models/FileFormat";
interface SelectChangeProps {
  handleSortFormat: (e?: string) => void;
  listFileFormat: FileFormat[];
}
const SelectChange = ({
  handleSortFormat,
  listFileFormat,
}: SelectChangeProps) => {
  return (
    <Select
      label="Select Format"
      className="text-white"
      onChange={handleSortFormat}
    >
      {listFileFormat.map((fileFormat) => (
        <Option key={fileFormat.id} value={`${fileFormat.id}`}>
          {fileFormat.name}
        </Option>
      ))}
    </Select>
  );
};

export default SelectChange;
