import { useEffect, useState } from "react";

type paginateInfoType = {
  last_page: number;
  limit: number;
  total_file: number;
  path: string;
};
export function usePaginate() {
  const [itemOffset, setItemOffset] = useState(0);
  const [paginateInfo, setPaginateInfo] = useState<paginateInfoType>();
  const [pageCount, setPageCount] = useState(0);
  const [nextPage, setNextPage] = useState(1);

  function handleSelectedPage(selected: number) {
    if (!paginateInfo) return;
    const newOffset = (selected * paginateInfo.limit) % paginateInfo.total_file;
    setItemOffset(newOffset);
    setNextPage(selected + 1);
  }
  useEffect(() => {
    if (!paginateInfo || !paginateInfo.total_file) return;
    setPageCount(Math.ceil(paginateInfo.total_file / paginateInfo.limit));
  }, [paginateInfo, itemOffset]);

  return [handleSelectedPage, setPaginateInfo, pageCount, nextPage] as const;
}
