import { useNavigate, useParams } from "react-router-dom";
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
import useListApi from "../../../hooks/useListApi";
import { useState } from "react";
import { showNotificationMessage } from "../../../utils/toast";
import { handleHttpReq } from "../../../utils/HandleHttpReq";

type CategoryQuestionExtraData = {
  categoryName: string;
  currentPage: number;
  message: string;
  totalPages: number;
  totalQuestions: number;
};

const CategoryQuestionList = () => {
  const navigate = useNavigate();
  const listUrl = GetCategoryQuestionUrl();
  const { id } = useParams();
  const initialFilter: GetCategoryQuestionParams = { categoryId: id! };

  const { data, extraData, fetchDataApi } = useListApi<
    CategoryQuestionResponse,
    CategoryQuestionExtraData
  >(listUrl, "", initialFilter);

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
              <svg viewBox="0 0 500 70">
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
                  y="52"
                  fill="url(#startBtnGradient)"
                >
                  Import
                </text>
              </svg>
            </button>
          </label>
        </div>
        {data.map((item) => (
          <CategoryQuestionCard
            key={item._id}
            props={{ ...item, categoryId: id }}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryQuestionList;
