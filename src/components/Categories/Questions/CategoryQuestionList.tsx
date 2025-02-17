import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useRef } from "react";
import Header from "../../Header";
import CategoryQuestionCard from "./CategoryQuestionCard";
import {
  GetCategoryQuestionUrl,
  uploadCsvQuestions,
} from "../../../services/QuestionService";
import {
  CategoryQuestionResponse,
  GetCategoryQuestionParams,
} from "../../../types/QuestionTypes";
import { showNotificationMessage } from "../../../utils/toast";
import { handleHttpReq } from "../../../utils/HandleHttpReq";
import useCursorListApi from "../../../hooks/useCursorListApi";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

type CategoryQuestionExtraData = {
  categoryName: string;
  message: string;
  nextCursor: string;
  totalQuestions: number;
  currentPage: number;
};

const CategoryQuestionList = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const listUrl = GetCategoryQuestionUrl();
  const initialFilter: GetCategoryQuestionParams = { categoryId: id! };

  const { data, extraData, fetchDataApi, hasMore, loadMore, loading } =
    useCursorListApi<CategoryQuestionResponse, CategoryQuestionExtraData>(
      listUrl,
      initialFilter
    );

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalQuestions,
    data.length
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    handleHttpReq(async () => {
      await uploadCsvQuestions(formData);
      fetchDataApi();
      showNotificationMessage(
        "Success",
        `Successfully imported questions csv`,
        "success"
      );
    });
  };

  return (
    <>
      <Header
        pageTitle={extraData?.categoryName}
        showRightButton={true}
        rightButtonText="Add More"
        rightButtonIcon="/images/header/add-icon.png"
        onRightButtonClick={() => navigate(`/categories-questions/${id}/form`)}
        RightButtonProps={{
          rightButtonAxis: "35%",
          rightButtonIconAxis: "18%",
        }}
      />
      <div className="category-question-list-container">
        <div className="category-question-list-import">
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            id="fileInput"
            className="hidden-input"
            onChange={handleFileChange}
          />

          <label htmlFor="fileInput" className="custom-file-label">
            <button
              className="importButton"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <img src="/images/categories/import.png" alt="Start Icon" />
              <svg viewBox="0 0 400 90">
                <defs>
                  <linearGradient
                    id="startBtnGradient"
                    x1="100%"
                    y1="50%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#e6fbff", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#96ffaa", stopOpacity: 1 }}
                    />
                  </linearGradient>
                </defs>
                <text
                  className="svgText"
                  x="20"
                  y="50"
                  fill="url(#startBtnGradient)"
                  alignmentBaseline="middle"
                >
                  Import
                </text>
              </svg>
            </button>
          </label>
        </div>
        {data.map((item, index) => (
          <CategoryQuestionCard
            key={item._id || `fallback-key-${index}`}
            ref={index === data.length - 1 ? lastElementRef : null}
            props={{ ...item, categoryId: id }}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryQuestionList;
