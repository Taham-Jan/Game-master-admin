import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import CategoryMemeCard from "./CategoryMemeCard";
import {
  DeleteAllMemes,
  DeleteMemesUrl,
  DeleteSelectedMemes,
  GetMemesUrl,
  GetMemeTypes,
} from "../../../services/MemeService";
import useCursorListApi from "../../../hooks/useCursorListApi";
import { MemesResponse } from "../../../types/MemeTypes";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import CustomDeleteDialog from "../../Dialog/CustomDeleteDialog";
import { useEffect, useState } from "react";
import { handleHttpReq } from "../../../utils/HandleHttpReq";
import { SelectBox } from "../../Shared/SelectBox";
import Loader from "../../Loader/loader";
import { RiDeleteBin6Line } from "react-icons/ri";
import { showNotificationMessage } from "../../../utils/toast";
import { MdCancel } from "react-icons/md";
import { GrSelect } from "react-icons/gr";

type MemesExtraData = {
  message: string;
  nextCursor: string;
  totalMemes: number;
};

const CategoryMemeList = () => {
  const navigate = useNavigate();
  const [memeTypes, setMemeTypes] = useState<string[]>([]);
  const [selectedMemeType, setSelectedMemeType] = useState<string | null>(null);
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const listUrl = GetMemesUrl();
  const deleteUrl = DeleteMemesUrl();

  const {
    data,
    extraData,
    hasMore,
    loadMore,
    loading,
    handleDeleteClick,
    onDeleteConfirm,
    onDeleteDialogClose,
    showDeleteDialog,
    fetchDataApi,
    setFilter,
  } = useCursorListApi<MemesResponse, MemesExtraData>(listUrl, deleteUrl);

  const onDeleteAllDialogClose = () => {
    setShowDeleteAllDialog(false);
  };

  const onDeleteAllConfirm = async () => {
    setShowDeleteAllDialog(false);

    await handleHttpReq(async () => {
      try {
        DeleteAllMemes();
      } catch (error) {
        console.error(error);
      }
    });

    fetchDataApi();
  };

  const lastElementRef = useInfiniteScroll(
    loadMore,
    hasMore,
    loading,
    extraData?.totalMemes,
    data.length
  );

  useEffect(() => {
    handleHttpReq(async () => {
      const memeTypeRes = await GetMemeTypes();
      setMemeTypes(memeTypeRes?.data?.data || []);
    });
  }, []);

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
      await DeleteSelectedMemes(selectedIds);
    });
    setSelectionMode(false);
    setSelectedIds([]);
    fetchDataApi();
  };

  return (
    <>
      <Header
        pageTitle="Memes"
        showRightButton={true}
        rightButtonText="Add Meme"
        rightButtonIcon="/images/header/add-icon.png"
        onBackClick={() => navigate("/")}
        onRightButtonClick={() => navigate("/categories-meme/form")}
        RightButtonProps={{
          rightButtonAxis: "35%",
          rightButtonIconAxis: "18%",
        }}
      />
      {data && memeTypes.length ? (
        <div className="adaptable-container">
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {!selectionMode ? (
              <>
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
                    <span>Delete All Memes</span>
                  </label>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
          <div
            style={{
              margin: "auto",
              width: "100%",
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
                label="Meme Type"
                value={selectedMemeType}
                options={memeTypes}
                includeAllOption
                onChange={(e) => {
                  const value = e.target.value;

                  setSelectedMemeType(value);
                  if (value) setFilter({ memeType: value });
                  else setFilter({});
                }}
              />
              <span style={{ fontSize: "0.8rem" }}>
                Total Memes: {extraData?.totalMemes || 0}
              </span>
            </div>
          </div>
          <div className="category-list-container">
            {data.map((item, index) => (
              <CategoryMemeCard
                key={item._id || `fallback-key-${index}`}
                ref={index === data.length - 1 ? lastElementRef : null}
                props={{
                  ...item,
                  showCheckbox: selectionMode,
                  checkboxChecked: selectedIds.includes(item._id),
                  onCheckboxChange: () => toggleSelect(item._id),
                  handleQuestionDeleteClick: handleDeleteClick(item._id),
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <CustomDeleteDialog
        title="Meme"
        isOpen={showDeleteDialog}
        onDialogClose={onDeleteDialogClose}
        onDeleteConfirm={onDeleteConfirm}
      />
      <CustomDeleteDialog
        title="All Memes"
        isOpen={showDeleteAllDialog}
        onDialogClose={onDeleteAllDialogClose}
        onDeleteConfirm={onDeleteAllConfirm}
      />
    </>
  );
};

export default CategoryMemeList;
