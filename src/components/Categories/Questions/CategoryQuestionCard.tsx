import "../../../styles/Categories.css";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryQuestionResponse } from "../../../types/QuestionTypes";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

interface CategoryQuestionCardProps extends CategoryQuestionResponse {
  categoryId: string;
  handleQuestionDeleteClick: () => void;
}
const CategoryQuestionCard = forwardRef<
  HTMLDivElement,
  { props: CategoryQuestionCardProps }
>(({ props }, ref) => {
  const { categoryId, _id, text, handleQuestionDeleteClick } = props;
  const navigate = useNavigate();
  return (
    <div className="category-question-card-container">
      <div
        ref={ref}
        className="category-question-card"
        onClick={() =>
          navigate(`/categories-questions/${categoryId}/form/${_id}`)
        }
      >
        <span>{text.en}</span>
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
      </div>
    </div>
  );
});
export default CategoryQuestionCard;
