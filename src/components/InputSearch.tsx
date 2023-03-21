interface InputSearch {
  handleSearch: (e: React.FormEvent<HTMLInputElement>) => void;
}

const InputSearch = ({ handleSearch }: InputSearch) => {
  return (
    <input
      type="text"
      onChange={handleSearch}
      className="bg-transparent border border-indigo-400 outline-none px-3 py-1 text-white rounded-sm"
      placeholder="Search"
    />
  );
};

export default InputSearch;
