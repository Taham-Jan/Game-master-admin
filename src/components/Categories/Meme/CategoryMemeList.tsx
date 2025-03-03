import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import CategoryMemeCard from "./CategoryMemeCard";
import { DeleteMemesUrl, GetMemesUrl } from "../../../services/MemeService";
import useCursorListApi from "../../../hooks/useCursorListApi";
import { MemesResponse } from "../../../types/MemeTypes";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import CustomDeleteDialog from "../../Dialog/CustomDeleteDialog";

type MemesExtraData = {
  message: string;
  nextCursor: string;
  totalMemes: number;
};

const CategoryMemeList = () => {
  const navigate = useNavigate();
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
  } = useCursorListApi<MemesResponse, MemesExtraData>(listUrl, deleteUrl);

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalMemes,
    data.length
  );

  return (
    <>
      <Header
        pageTitle="Memes"
        showRightButton={true}
        rightButtonText="Add Meme"
        rightButtonIcon="/images/header/add-icon.png"
        onRightButtonClick={() => navigate("/categories-meme/form")}
        RightButtonProps={{
          rightButtonAxis: "35%",
          rightButtonIconAxis: "18%",
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
