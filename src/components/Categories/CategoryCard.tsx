import { useNavigate } from "react-router-dom";
import "../../styles/Categories.css";
import { GetCategoriesResponse } from "../../types/CategoryTypes";
import { forwardRef } from "react";

const CategoryCard = forwardRef<
  HTMLDivElement,
  { item: GetCategoriesResponse }
>(({ item }, ref) => {
  const navigate = useNavigate();

  return (
    <div
      className="category-card"
      onClick={() => navigate(`/categories-questions/${item._id}`)}
      ref={ref}
    >
      <img
        src={item.icon}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "/images/categories/404-error.png";
        }}
        alt={"Card image"}
      />
      <label>
        <span>{item.name}</span>
      </label>
    </div>
  );
});

export default CategoryCard;
