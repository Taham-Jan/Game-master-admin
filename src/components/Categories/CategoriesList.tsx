import CategoryCard from "./CategoryCard";
import {
  getCategoriesDeleteUrl,
  getCategoriesListUrl,
} from "../../services/CategoryService";
import { GetCategoriesResponse } from "../../types/CategoryTypes";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useCursorListApi from "../../hooks/useCursorListApi";
import RenderSvgButton from "../Shared/RenderSvgButton";
import { useNavigate } from "react-router-dom";
import CustomDeleteDialog from "../Dialog/CustomDeleteDialog";

type CategoriesExtraData = {
  message: string;
  nextCursor: string;
  totalCategories: number;
};

const CategoriesList = () => {
  const listUrl = getCategoriesListUrl();
  const deleteUrl = getCategoriesDeleteUrl();

  const {
    data: CategoryData,
    extraData,
    hasMore,
    loadMore,
    loading,
    handleDeleteClick,
    showDeleteDialog,
    onDeleteConfirm,
    onDeleteDialogClose,
  } = useCursorListApi<GetCategoriesResponse, CategoriesExtraData>(
    listUrl,
    deleteUrl
  );

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalCategories,
    CategoryData.length
  );
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="adaptable-container">
          <div className="category-list-container">
            {CategoryData.map((item, index) => (
              <CategoryCard
                key={item._id || `fallback-key-${index}`}
                ref={index === CategoryData.length - 1 ? lastElementRef : null}
                props={{
                  ...item,
                  handleQuestionDeleteClick: handleDeleteClick(item._id),
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <CustomDeleteDialog
        title="Category"
        isOpen={showDeleteDialog}
        onDialogClose={onDeleteDialogClose}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default CategoriesList;
