import { forwardRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MemesResponse } from "../../../types/MemeTypes";

interface MemeCardProps extends MemesResponse {
  handleQuestionDeleteClick: () => void;
}

const CategoryMemeCard = forwardRef<HTMLDivElement, { props: MemeCardProps }>(
  ({ props }, ref) => {
    const { name, handleQuestionDeleteClick } = props;

    return (
      <div
        className="category-card"
        style={{ cursor: "default" }}
        onClick={(e) => {
          e.stopPropagation();
          console.log("MEME CARD CLICKED");
        }}
        ref={ref}
      >
        <RiDeleteBin6Line
          className="category-card-delete-icon"
          onClick={(event) => {
            event.stopPropagation();
            handleQuestionDeleteClick();
          }}
        />
        <img
          src={name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/images/categories/404-error.png";
          }}
          alt={"Card image"}
        />
      </div>
    );
  }
);

export default CategoryMemeCard;
