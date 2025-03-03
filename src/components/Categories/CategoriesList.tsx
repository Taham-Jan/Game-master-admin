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
    <div style={{ marginTop: "30px" }}>
      <RenderSvgButton
        iconUrl="/images/categories/meme-icon.png"
        text="View Meme"
        // onClick={() => navigate(`/categories-meme/form`)}
        onClick={() => navigate(`/categories-meme`)}
        forceSingleLine
      />
      <div className="import-button-group"></div>
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
  );
};

export default CategoriesList;
