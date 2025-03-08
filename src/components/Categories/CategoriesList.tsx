import CategoryCard from "./CategoryCard";
import { getCategoriesListUrl } from "../../services/CategoryService";
import { GetCategoriesResponse } from "../../types/CategoryTypes";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import useCursorListApi from "../../hooks/useCursorListApi";
import RenderSvgButton from "../Shared/RenderSvgButton";
import { useNavigate } from "react-router-dom";

type CategoriesExtraData = {
  message: string;
  nextCursor: string;
  totalCategories: number;
};

const CategoriesList = () => {
  const listUrl = getCategoriesListUrl();

  const {
    data: CategoryData,
    extraData,
    hasMore,
    loadMore,
    loading,
  } = useCursorListApi<GetCategoriesResponse, CategoriesExtraData>(listUrl);

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalCategories,
    CategoryData.length
  );
  const navigate = useNavigate();

  return (
    <div>
      <div className="adaptable-container">
        <div className="category-list-container">
          {CategoryData.map((item, index) => (
            <CategoryCard
              key={item._id || `fallback-key-${index}`}
              ref={index === CategoryData.length - 1 ? lastElementRef : null}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
