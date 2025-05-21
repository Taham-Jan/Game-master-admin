import "../../../styles/Categories.css";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryQuestionResponse } from "../../../types/QuestionTypes";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomCheckBox from "../../Shared/CustomCheckBox";

interface CategoryQuestionCardProps extends CategoryQuestionResponse {
  categoryId: string;
  handleQuestionDeleteClick: () => void;
  showCheckbox: boolean;
  checkboxChecked: boolean;
  onCheckboxChange: () => void;
}
const CategoryQuestionCard = forwardRef<
  HTMLDivElement,
  { props: CategoryQuestionCardProps }
>(({ props }, ref) => {
  const {
    categoryId,
    _id,
    isShow,
    text,
    handleQuestionDeleteClick,
    checkboxChecked,
    onCheckboxChange,
    showCheckbox,
  } = props;
  const navigate = useNavigate();
  return (
    <>
      <div className="category-question-card-container">
        <div
          ref={ref}
          className="category-question-card"
          onClick={() => {
            if (showCheckbox) {
              onCheckboxChange();
            } else {
              navigate(`/categories-questions/${categoryId}/form/${_id}`);
            }
          }}
        >
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {showCheckbox && (
              <CustomCheckBox
                style={{ padding: "5px" }}
                checked={checkboxChecked}
                onChange={onCheckboxChange}
                size={24}
              />
            )}
            {text.en}
          </span>
          {!showCheckbox && (
            <div className="category-question-card-icon-container">
              <img
                src="/images/categories/question-list-button-icon.png"
                alt="Question List"
                className="category-question-next-icon"
              />
              <RiDeleteBin6Line
                className="category-question-delete-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  handleQuestionDeleteClick();
                }}
              />
            </div>
          )}
        </div>
        <span style={{ textAlign: "center", fontSize: "0.6em" }}>
          USED
          <CustomCheckBox
            style={{ padding: "5px", cursor: "not-allowed" }}
            checked={isShow || false}
            onChange={(e) => console.log(e)}
            size={24}
          />
        </span>
      </div>
    </>
  );
});
export default CategoryQuestionCard;
