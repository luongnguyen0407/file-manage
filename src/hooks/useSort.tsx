import { useState } from "react";

export function useSort<T>(initialValue: T) {
  const [sort, setSort] = useState<T>(initialValue);
  const [colSort, setColSort] = useState<T>();
  return [sort, setSort, colSort, setColSort] as const;
}
