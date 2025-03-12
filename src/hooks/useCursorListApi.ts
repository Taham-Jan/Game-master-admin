import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import ApiService from "../services/ApiService";
import { ApiResponse } from "../types/ApiResponse";
import { handleHttpReq } from "../utils/HandleHttpReq";
import { showNotificationMessage } from "../utils/toast";

export type OnSortParam = { order: "asc" | "desc" | ""; key: string | number };

type FilterType = {
  [key: string]: string;
} | null;

function useCursorListApi<T, U = undefined>(
  listUrl: string,
  deleteUrl: string = "",
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>("");

  const setFilter = (filters: FilterType) => {
    setFilterState(filters);
    setCursor(null);
    setData([]);
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

        const newData = result.data.data;

        setData((prev) => {
          const combined = reset ? newData : [...prev, ...newData];
          return _.uniqBy(combined, (item: any) => item._id);
        });
        setCursor(result.data?.nextCursor || null);
        setHasMore(!!result.data?.nextCursor);

        const { data: NotNeeded, ...rest } = result.data;
        setExtraData(rest as U);
      });
    } catch (error) {
      console.log(`Error fetching data:`, error);
    }

    setLoading(false);
  };

  const loadMore = useCallback(() => {
    fetchDataApi();
  }, [cursor, loading, data]);

  useEffect(() => {
    setData([]);
    setCursor(null);
    fetchDataApi(true);
  }, [listUrl, sort, query, filter]);

  const handleDeleteClick = useCallback(
    (id: string | undefined) => () => {
      setSelectedItem(id);
      setShowDeleteDialog(true);
    },
    []
  );

  const onDeleteDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const onDeleteConfirm = async () => {
    try {
      setShowDeleteDialog(false);
      setLoading(true);

      await ApiService.fetchData<ApiResponse<T>>({
        url: deleteUrl + selectedItem,
        method: "delete",
        data: { id: selectedItem },
      });

      showNotificationMessage(
        "Success",
        "Your deletion has been processed successfully.",
        "success"
      );

      setCursor(null);
      setData([]);
      fetchDataApi(true);
    } catch (error) {
      console.error("Error during deletion:", error);
      setLoading(false);
    }
  };

  return {
    data,
    extraData,
    loading,
    hasMore,
    fetchDataApi,
    loadMore,
    setSort,
    setFilter,
    onDeleteDialogClose,
    onDeleteConfirm,
    handleDeleteClick,
    showDeleteDialog,
  };
}

export default useCursorListApi;
