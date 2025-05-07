import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header";
import CategoryQuestionCard from "./CategoryQuestionCard";
import {
  DeleteAllQuestions,
  DeleteSelectedQuestions,
  GetCategoryQuestionDeleteUrl,
  GetCategoryQuestionUrl,
  uploadCsvQuestions,
} from "../../../services/QuestionService";
import {
  AgeRanges,
  AgeRangeType,
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
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrSelect } from "react-icons/gr";
import { MdCancel } from "react-icons/md";
import { SelectBox } from "../../Shared/SelectBox";

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

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState<AgeRangeType>("All");
  const listUrl = GetCategoryQuestionUrl();
  const deleteUrl = GetCategoryQuestionDeleteUrl();
  const initialFilter: GetCategoryQuestionParams = {
    categoryId: id!,
    ageRange: selectedAgeRange,
  };

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
    setFilter,
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

  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const onDeleteAllDialogClose = () => {
    setShowDeleteAllDialog(false);
  };

  const onDeleteAllConfirm = async () => {
    setShowDeleteAllDialog(false);

    await handleHttpReq(async () => {
      try {
        DeleteAllQuestions(id);
      } catch (error) {
        console.error(error);
      }
    });

    fetchDataApi();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const onStartSelect = () => {
    setSelectionMode(true);
    setSelectedIds([]);
  };

  const onCancelSelect = () => {
    setSelectionMode(false);
    setSelectedIds([]);
  };

  const onDeleteSelected = async () => {
    if (!selectedIds.length) return;

    await handleHttpReq(async () => {
      await DeleteSelectedQuestions(id, selectedIds);
    });
    setSelectionMode(false);
    setSelectedIds([]);
    fetchDataApi();
  };

  return (
    <>
      <Header
        pageTitle={extraData?.categoryName}
        showRightButton={true}
        rightButtonText="Add More"
        rightButtonIcon="/images/header/add-icon.png"
        onBackClick={() => navigate("/categories")}
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
          {!selectionMode ? (
            <>
              <div className="category-question-list-import">
                <button className="navigationButton" onClick={onStartSelect}>
                  <GrSelect
                    style={{ color: "#20618e" }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                  <label>
                    <span>Select</span>
                  </label>
                </button>
              </div>
              <div className="category-question-list-import">
                <button
                  type="button"
                  className="navigationButton"
                  onClick={() => setShowDeleteAllDialog(true)}
                >
                  <RiDeleteBin6Line
                    style={{ color: "#20618e" }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />

                  <label>
                    <span>Delete All Questions</span>
                  </label>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="category-question-list-import">
                <button className="navigationButton" onClick={onCancelSelect}>
                  <MdCancel
                    style={{ color: "#20618e" }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />

                  <label>
                    <span>Cancel</span>
                  </label>
                </button>
              </div>
              <div className="category-question-list-import">
                <button
                  className="navigationButton"
                  disabled={!selectedIds.length}
                  onClick={onDeleteSelected}
                >
                  <RiDeleteBin6Line
                    style={{ color: "#20618e" }}
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  />
                  <label>
                    <span>Delete Selected</span>
                  </label>
                </button>
              </div>
            </>
          )}
        </div>
        <div
          style={{
            margin: "auto",
            width: "72%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.5rem",
              marginLeft: "auto",
              width: "fit-content",
            }}
          >
            <SelectBox
              label="Age Range"
              value={
                AgeRanges.includes(selectedAgeRange) ? selectedAgeRange : ""
              }
              options={AgeRanges}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedAgeRange(value);
                setFilter({
                  ...initialFilter,
                  ageRange: value || "All",
                });
              }}
            />
            <span style={{ fontSize: "0.8rem" }}>
              Total Questions: {extraData?.totalQuestions || 0}
            </span>
          </div>
        </div>
        {data.map((item, index) => (
          <CategoryQuestionCard
            key={item._id || `fallback-key-${index}`}
            ref={index === data.length - 1 ? lastElementRef : null}
            props={{
              ...item,
              categoryId: id,
              showCheckbox: selectionMode,
              checkboxChecked: selectedIds.includes(item._id),
              onCheckboxChange: () => toggleSelect(item._id),
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

      <CustomDeleteDialog
        title="All Questions"
        isOpen={showDeleteAllDialog}
        onDialogClose={onDeleteAllDialogClose}
        onDeleteConfirm={onDeleteAllConfirm}
      />
    </>
  );
};

export default CategoryQuestionList;
