import { useNavigate } from "react-router-dom";
import { forwardRef } from "react";
import { GetCategoryMemeResponse } from "../../../types/CategoryTypes";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoryMemeCard = forwardRef<
  HTMLDivElement,
  { item: GetCategoryMemeResponse }
>(({ item }, ref) => {
  const navigate = useNavigate();

  return (
    <div
      className="category-card"
      onClick={(e) => {
        e.stopPropagation();
        console.log("MEME CARD CLICKED");
      }}
      ref={ref}
    >
      <RiDeleteBin6Line
        className="category-card-delete-icon"
        onClick={() => {}}
      />
      <img
        src={item.background}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "/images/categories/404-error.png";
        }}
        alt={"Card image"}
      />
    </div>
  );
});

export default CategoryMemeCard;
