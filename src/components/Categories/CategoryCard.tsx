import { useNavigate } from "react-router-dom";
import "../../styles/Categories.css";
import { GetCategoriesResponse } from "../../types/CategoryTypes";
import { forwardRef } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

interface CategoryCardProps extends GetCategoriesResponse {
  handleQuestionDeleteClick: () => void;
}

const CategoryCard = forwardRef<HTMLDivElement, { props: CategoryCardProps }>(
  ({ props }, ref) => {
    const { handleQuestionDeleteClick, ...item } = props;
    const navigate = useNavigate();

    return (
      // <div className="category-card-container">
      <>
        <div
          className="category-card"
          onClick={() => navigate(`/categories-questions/${item._id}`)}
          ref={ref}
        >
          <div className="category-card-icons">
            <CiEdit
              className="category-card-edit-icon"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/categories-form-edit/${item._id}`);
              }}
            />
            <RiDeleteBin6Line
              className="category-card-delete-icon"
              onClick={(event) => {
                event.stopPropagation();
                handleQuestionDeleteClick();
              }}
            />
          </div>

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
            <br />
            <span>{item.nameAR}</span>
          </label>
        </div>
        {/* <div className="category-card-edit-container">
          EDIT CATEGORY
          <FaRegEdit
            // className="category-card-edit-icon"
            onClick={(event) => {
              event.stopPropagation();
              handleQuestionDeleteClick();
            }}
          />
        </div> */}
        {/* </div> */}
      </>
    );
  }
);

export default CategoryCard;
