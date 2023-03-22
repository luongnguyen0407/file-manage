import { useState } from "react";
import { useDebounce } from "./useDebounce";

export function useSearch(delay: number = 1000) {
  const [search, setSearch] = useState<string>("");
  const delaySearch: string = useDebounce<string>(search, delay);
  return [setSearch, delaySearch] as const;
}
