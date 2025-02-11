import React from "react";
import { useNavigate } from "react-router-dom";
import { CategoryQuestionResponse } from "../../../types/QuestionTypes";

const CategoryQuestionCard: React.FC<{ props: CategoryQuestionResponse }> = ({
  props,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="category-question-card"
      onClick={() => navigate(`/categories-questions/${props._id}`)}
    >
      <span>{props.text.en}</span>
      <img src="/images/categories/question-list-button-icon.png" />
    </div>
  );
};

export default CategoryQuestionCard;
