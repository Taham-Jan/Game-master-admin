import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import CategoryQuestionCard from "./CategoryQuestionCard";
import {
  GetCategoryQuestionDeleteUrl,
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
import { useEffect, useState } from "react";
import Dialog from "../../Dialog/DialogBox";
import { uploadFile } from "../../../services/UploadService";
import CustomDeleteDialog from "../../Dialog/CustomDeleteDialog";
import RenderSvgButton from "../../Shared/RenderSvgButton";

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
  const deleteUrl = GetCategoryQuestionDeleteUrl();
  const initialFilter: GetCategoryQuestionParams = { categoryId: id! };

  const {
    data,
    extraData,
    fetchDataApi,
    hasMore,
    loadMore,
    loading,
    handleDeleteClick,
    onDeleteConfirm,
    onDeleteDialogClose,
    showDeleteDialog,
  } = useCursorListApi<CategoryQuestionResponse, CategoryQuestionExtraData>(
    listUrl,
    deleteUrl,
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState(null);
  const handleUploadMedia = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await handleHttpReq(
      (controller) => uploadFile(formData, controller),
      "Uploading"
    );

    setMediaUrl(response.data.url);
    setIsDialogOpen(true);
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
        <div className="import-button-group">
          <div className="category-question-list-import">
            <input
              type="file"
              accept="audio/*, video/*, image/*"
              id="mediaInput"
              className="hidden-input"
              onChange={handleUploadMedia}
            />
            <label htmlFor="mediaInput" className="custom-file-label">
              <RenderSvgButton
                iconUrl="/images/categories/upload-media.png"
                text="Upload Media"
                onClick={() => document.getElementById("mediaInput")?.click()}
              />
            </label>
          </div>
          <div className="category-question-list-import">
            <input
              type="file"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="fileInput"
              className="hidden-input"
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="custom-file-label">
              <RenderSvgButton
                iconUrl="/images/categories/import.png"
                text="Import Questions"
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </label>
          </div>
        </div>
        {data.map((item, index) => (
          <CategoryQuestionCard
            key={item._id || `fallback-key-${index}`}
            ref={index === data.length - 1 ? lastElementRef : null}
            props={{
              ...item,
              categoryId: id,
              handleQuestionDeleteClick: handleDeleteClick(item._id),
            }}
          />
        ))}
      </div>

      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Cloud URL for your uploaded media"
      >
        {mediaUrl}
      </Dialog>

      <CustomDeleteDialog
        title="Category Question"
        isOpen={showDeleteDialog}
        onDialogClose={onDeleteDialogClose}
        onDeleteConfirm={onDeleteConfirm}
      />
    </>
  );
};

export default CategoryQuestionList;
