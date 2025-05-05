import { forwardRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MemesResponse } from "../../../types/MemeTypes";
import CustomCheckBox from "../../Shared/CustomCheckBox";

interface MemeCardProps extends MemesResponse {
  handleQuestionDeleteClick: () => void;
  showCheckbox: boolean;
  checkboxChecked: boolean;
  onCheckboxChange: () => void;
}

const CategoryMemeCard = forwardRef<HTMLDivElement, { props: MemeCardProps }>(
  ({ props }, ref) => {
    const {
      name,
      handleQuestionDeleteClick,
      checkboxChecked,
      onCheckboxChange,
      showCheckbox,
    } = props;

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
        {showCheckbox && (
          <CustomCheckBox
            style={{ position: "absolute", top: 8, left: 8 }}
            checked={checkboxChecked}
            onChange={onCheckboxChange}
            size={24}
          />
        )}

        {!showCheckbox && (
          <div className="category-card-icons">
            <RiDeleteBin6Line
              className="category-card-delete-icon"
              onClick={(e) => {
                e.stopPropagation();
                handleQuestionDeleteClick();
              }}
            />
          </div>
        )}

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
