import "../../../styles/Categories.css";
import React, { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryQuestionResponse } from "../../../types/QuestionTypes";

interface CategoryQuestionCardProps extends CategoryQuestionResponse {
  categoryId: string;
}

const CategoryQuestionCard = forwardRef<
  HTMLDivElement,
  { props: CategoryQuestionCardProps }
>(({ props }, ref) => {
  const navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="category-question-card"
      onClick={() =>
        navigate(`/categories-questions/${props.categoryId}/form/${props._id}`)
      }
    >
      <span>{props.text.en}</span>
      <img src="/images/categories/question-list-button-icon.png" />
    </div>
  );
});

export default CategoryQuestionCard;
