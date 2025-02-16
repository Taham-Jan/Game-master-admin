import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import ApiService from "../services/ApiService";
import { ApiResponse } from "../types/ApiResponse";
import { handleHttpReq } from "../utils/HandleHttpReq";

export type OnSortParam = { order: "asc" | "desc" | ""; key: string | number };

type FilterType = {
  [key: string]: string;
} | null;

function useCursorListApi<T, U = undefined>(
  listUrl: string,
  initialFilter: FilterType = null
) {
  const [data, setData] = useState<T[]>([]);
  const [extraData, setExtraData] = useState<U>();
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sort, setSort] = useState<OnSortParam | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilterState] = useState<FilterType>(initialFilter);

  const setFilter = (filters: FilterType) => {
    setFilterState(filters);
    setCursor(null);
    setData([]);
    fetchDataApi(true);
  };

  const fetchDataApi = async (reset = false) => {
    if (loading || (!reset && cursor === null && data.length > 0)) return;

    setLoading(true);
    const params = {
      cursor: reset ? null : cursor,
      search: query,
      orderBy: sort?.order,
      orderByField: sort?.key,
      ...filter,
    };

    try {
      await handleHttpReq(async () => {
        const result = await ApiService.fetchData<ApiResponse<T[]>>({
          url: listUrl,
          method: "get",
          params,
        });

        setData((prev) =>
          reset ? result.data.data : [...prev, ...result.data.data]
        );
        setCursor(result.data.page?.nextCursor || null);
        setHasMore(!!result.data.page?.nextCursor);

        const { data: _, ...rest } = result.data;
        setExtraData(rest as never);
      });
    } catch (error) {
      console.log(`Error fetching data:`, error);
    }

    setLoading(false);
  };

  const loadMore = useCallback(() => fetchDataApi(), [cursor]);

  useEffect(() => {
    setData([]);
    setCursor(null);
    fetchDataApi(true);
  }, [listUrl, sort, query, filter]);

  return {
    data,
    extraData,
    loading,
    hasMore,
    fetchDataApi,
    loadMore,
    setSort,
    setFilter,
  };
}

export default useCursorListApi;
