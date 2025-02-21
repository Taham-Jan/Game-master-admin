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
import { showNotificationMessage } from "../../../utils/toast";
import { handleHttpReq } from "../../../utils/HandleHttpReq";
import useCursorListApi from "../../../hooks/useCursorListApi";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { useEffect, useState } from "react";
import Dialog from "../../Dialog/DialogBox";
import { uploadFile } from "../../../services/UploadService";

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
  const RenderButton = ({
    text,
    onClick,
    iconUrl,
  }: {
    text: string;
    iconUrl: string;
    onClick: () => void;
  }) => {
    const [isSingleLine, setIsSingleLine] = useState(window.innerWidth <= 1024);

    useEffect(() => {
      const handleResize = () => {
        setIsSingleLine(window.innerWidth <= 1024);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
      <button className="importButton" onClick={onClick}>
        <img src={iconUrl} alt="Start Icon" />
        <svg viewBox="0 0 800 250">
          <defs>
            <linearGradient
              id="btnGradient"
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
            y={isSingleLine ? "130" : "100"}
            fill="url(#btnGradient)"
            alignmentBaseline="middle"
          >
            {isSingleLine ? (
              text
            ) : (
              <>
                <tspan x="20" dy="0">
                  {text.split(" ")[0]}{" "}
                </tspan>
                <tspan x="20" dy="100">
                  {text.split(" ")[1]}{" "}
                </tspan>
              </>
            )}
          </text>
        </svg>
      </button>
    );
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
              <RenderButton
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
              <RenderButton
                iconUrl="/images/categories/import.png"
                text="Import Questions"
                onClick={() => document.getElementById("fileInput")?.click()}
              />
            </label>
          </div>
          <RenderButton
            iconUrl="/images/categories/meme-icon.png"
            text="Create Meme"
            onClick={() => navigate(`/categories-meme/${id}/form`)}
          />
        </div>
        {data.map((item, index) => (
          <CategoryQuestionCard
            key={item._id || `fallback-key-${index}`}
            ref={index === data.length - 1 ? lastElementRef : null}
            props={{ ...item, categoryId: id }}
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
    </>
  );
};

export default CategoryQuestionList;
