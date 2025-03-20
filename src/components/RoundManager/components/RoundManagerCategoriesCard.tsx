import React from "react";
import { GetCategoriesResponse } from "../../../types/CategoryTypes";
import useCursorListApi from "../../../hooks/useCursorListApi";
import { CategoriesExtraData } from "../../Categories/CategoriesList";
import { getCategoriesListUrl } from "../../../services/CategoryService";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

interface RoundManagerCategoriesCardProps {
  type: "green" | "magenta" | "basic";
  title: string;
  onSelect: (category: GetCategoriesResponse) => void;
  selectedIds: string[];
}

const RoundManagerCategoriesCard: React.FC<RoundManagerCategoriesCardProps> = ({
  type,
  title,
  onSelect,
  selectedIds,
}) => {
  const categoriesListUrl = getCategoriesListUrl();

  const {
    data: CategoryData,
    extraData,
    hasMore,
    loadMore,
    loading,
  } = useCursorListApi<GetCategoriesResponse, CategoriesExtraData>(
    categoriesListUrl
  );

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalCategories,
    CategoryData.length
  );

  return (
    <div className="round-Manager-card-container">
      <div className="round-Manager-card-parent-heading">{title}</div>
      <div className="round-Manager-card-list">
        {CategoryData.map((category, index) => {
          const isSelected = selectedIds.includes(category._id);
          return (
            <div
              ref={index === CategoryData.length - 1 ? lastElementRef : null}
              className={`round-Manager-card ${type} ${
                isSelected ? "disabled" : ""
              }`}
              key={category._id}
            >
              <span className="round-Manager-card-heading">
                {category.name}
              </span>
              <img
                src={`/images/roundManager/game-mode-active-${type}-icon.png`}
                alt="select category"
                onClick={() => !isSelected && onSelect(category)}
                style={{
                  cursor: isSelected ? "not-allowed" : "pointer",
                  opacity: isSelected ? 0.5 : 1,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoundManagerCategoriesCard;
