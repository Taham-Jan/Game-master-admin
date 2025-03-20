import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import CategoryMemeCard from "./CategoryMemeCard";
import {
  DeleteMemesUrl,
  GetMemesUrl,
  GetMemeTypes,
} from "../../../services/MemeService";
import useCursorListApi from "../../../hooks/useCursorListApi";
import { MemesResponse } from "../../../types/MemeTypes";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import CustomDeleteDialog from "../../Dialog/CustomDeleteDialog";
import { useEffect, useState } from "react";
import { handleHttpReq } from "../../../utils/HandleHttpReq";
import { SelectBox } from "../../Shared/SelectBox";
import Loader from "../../Loader/loader";

type MemesExtraData = {
  message: string;
  nextCursor: string;
  totalMemes: number;
};

const CategoryMemeList = () => {
  const navigate = useNavigate();
  const [memeTypes, setMemeTypes] = useState<string[]>([]);
  const [selectedMemeType, setSelectedMemeType] = useState<string | null>(null);

  const listUrl = GetMemesUrl();
  const deleteUrl = DeleteMemesUrl();

  const {
    data,
    extraData,
    hasMore,
    loadMore,
    loading,
    handleDeleteClick,
    onDeleteConfirm,
    onDeleteDialogClose,
    showDeleteDialog,
    setFilter,
  } = useCursorListApi<MemesResponse, MemesExtraData>(listUrl, deleteUrl);

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalMemes,
    data.length
  );

  useEffect(() => {
    handleHttpReq(async () => {
      const memeTypeRes = await GetMemeTypes();
      setMemeTypes(memeTypeRes?.data?.data);
    });
  }, []);

  return (
    <>
      <Header
        pageTitle="Memes"
        showRightButton={true}
        rightButtonText="Add Meme"
        rightButtonIcon="/images/header/add-icon.png"
        onBackClick={() => navigate("/")}
        onRightButtonClick={() => navigate("/categories-meme/form")}
        RightButtonProps={{
          rightButtonAxis: "35%",
          rightButtonIconAxis: "18%",
        }}
      />
      {data && memeTypes.length ? (
        <div className="adaptable-container">
          <SelectBox
            label="Meme Type"
            value={selectedMemeType}
            options={memeTypes}
            includeAllOption
            onChange={(e) => {
              const value = e.target.value;

              setSelectedMemeType(value);
              if (value) setFilter({ memeType: value });
              else setFilter({});
            }}
          />
          <div className="category-list-container">
            {data.map((item, index) => (
              <CategoryMemeCard
                key={item._id || `fallback-key-${index}`}
                ref={index === data.length - 1 ? lastElementRef : null}
                props={{
                  ...item,
                  handleQuestionDeleteClick: handleDeleteClick(item._id),
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <CustomDeleteDialog
        title="Meme"
        isOpen={showDeleteDialog}
        onDialogClose={onDeleteDialogClose}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default CategoryMemeList;
