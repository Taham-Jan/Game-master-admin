import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { showNotificationMessage } from "../utils/toast";
import ApiService from "../services/ApiService";
import _ from "lodash";
import { ApiResponse } from "../types/ApiResponse";

export type OnSortParam = { order: "asc" | "desc" | ""; key: string | number };

type FilterType = {
  [key: string]: string;
} | null;

function useListApi<T, U = undefined>(
  listUrl: string,
  deleteUrl: string = "",
  initialFilter: FilterType = null
) {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | undefined>("");
  const [data, setData] = useState<T[]>([]);
  const [extraData, setExtraData] = useState<U>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [sort, setSort] = useState<OnSortParam | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filter, setFilterState] = useState<FilterType>(initialFilter);

  const setFilter = (filters: FilterType) => {
    setFilterState(filters);
    setPageIndex(1);
  };
  // fetch api
  const fetchDataApi = async () => {
    setLoading(true);
    const filterOptions = filter ? { ...filter } : {};
    const params = {
      page: pageIndex,
      search: query,
      limit: pageSize,
      orderBy: sort?.order,
      orderByField: sort?.key,
      ...filterOptions,
    };
    try {
      // fetch result
      const result = await ApiService.fetchData<ApiResponse<T[]>>({
        url: listUrl,
        method: "get",
        params,
      });

      console.log("result==>", result);

      // for testing
      // await new Promise((resolve) => setTimeout(resolve, 3000))

      // set data in state
      setLoading(false);

      setData(result.data.data);
      const { data: _, ...rest } = result.data;
      setExtraData(rest as never);

      setPageIndex(result.data.page?.page ?? 1);
      setPageSize(result.data.page?.limit ?? 10);
      setTotal(result.data.page?.totalDocs ?? 0);
    } catch (error) {
      console.log(`error`, error);
      setLoading(false);
    }
  };

  // change events
  const onPaginationChange = (page: number) => {
    setPageIndex(page);
  };

  const onPageSizeChange = (value: number) => {
    setPageIndex(1);
    setPageSize(value);
    setData([]);
  };

  const onSort = (sort: OnSortParam) => {
    setSort(sort);
  };

  function onSearchChange(val: string) {
    setQuery(val);
    setPageIndex(1);
    setTotal(0);
    setData([]);
  }

  const debounceFn = _.debounce(onSearchChange, 500);

  const onEditSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
  };

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
        "Your deletion has been processed successfully."
      );

      fetchDataApi();
    } catch (error) {
      console.log(`error`, error);
      setLoading(false);
    }
  };

  // use effect call
  useEffect(() => {
    fetchDataApi();
  }, [pageIndex, sort, query, pageSize, filter, listUrl]);

  // return state and functions
  return {
    pageIndex,
    pageSize,
    total,
    extraData,
    data,
    setData,
    selectedItem,
    showDeleteDialog,
    loading,
    onPaginationChange,
    onPageSizeChange,
    onSort,
    onEditSearch,
    onDeleteDialogClose,
    onDeleteConfirm,
    handleDeleteClick,
    filter,
    setFilter,
    setTotal,
    fetchDataApi,
  };
}

export default useListApi;
