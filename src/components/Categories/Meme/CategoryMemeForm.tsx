import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import VideoPlayer from "../Questions/VideoPlayer";
import AudioPlayer from "../Questions/AudioPlayer";
import { handleHttpReq } from "../../../utils/HandleHttpReq";
import Dialog from "../../Dialog/DialogBox";
import { createNewMeme, GetMemeTypes } from "../../../services/MemeService";
import { SelectBox } from "../../Shared/SelectBox";
import Loader from "../../Loader/loader";

type FileType = "IMAGE" | "VIDEO" | "SOUND" | "";

const CategoryMemeForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [memeTypes, setMemeTypes] = useState<string[]>([]);
  const [selectedMemeType, setSelectedMemeType] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [fileType, setFileType] = useState<FileType>("");
  const [uploadedLink, setUploadedLink] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  useEffect(() => {
    handleHttpReq(async () => {
      const memeTypeRes = await GetMemeTypes();
      setMemeTypes(memeTypeRes?.data?.data);
      setSelectedMemeType(memeTypeRes?.data?.data[0]);
    });
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        setFileType("IMAGE");
      } else if (file.type.startsWith("video/")) {
        setFileType("VIDEO");
      } else if (file.type.startsWith("audio/")) {
        setFileType("SOUND");
      } else {
        setFileType("");
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("memeType", selectedMemeType);

    const response = await handleHttpReq(
      (controller) => createNewMeme(formData, controller),
      "Uploading"
    );
    if (!response) return;
    setUploadedLink(response?.data?.url);
    setIsDialogOpen(true);
  };

  const onDialogClose = () => {
    setSelectedFile(null);
    setSelectedMemeType(memeTypes[0]);
    setPreviewUrl(null);
    setFileType(null);
    setUploadedLink(null);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Header
        pageTitle="Create Meme"
        showRightButton={false}
        rightButtonText="Save"
        rightButtonIcon="/images/header/save-icon.png"
        onRightButtonClick={handleUpload}
        onBackClick={() => navigate("/categories-meme")}
        RightButtonProps={{
          rightButtonAxis: "45%",
          rightButtonIconAxis: "25%",
        }}
      />
      {memeTypes.length ? (
        <div className="adaptable-container">
          <SelectBox
            label="Meme Type"
            value={selectedMemeType}
            options={memeTypes}
            onChange={(e) => setSelectedMemeType(e.target.value)}
          />
          <input
            type="file"
            accept="video/*,audio/*,image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {!selectedFile && (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="meme-upload-container"
              style={{ cursor: "pointer" }}
            >
              <div className="question-upload-content">
                <img
                  src="/images/categories/image-plus-icon.png"
                  alt="Upload Icon"
                  className="question-uploaded-image"
                />
                <span>Please click to upload</span>
              </div>
            </div>
          )}

          {selectedFile && previewUrl && (
            <div className="meme-upload-container">
              {fileType === "VIDEO" && <VideoPlayer file={previewUrl} />}
              {fileType === "SOUND" && <AudioPlayer file={previewUrl} />}
              {fileType === "IMAGE" && (
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className="meme-uploaded-media"
                />
              )}
            </div>
          )}

          {selectedFile && (
            <div className="file-actions">
              <button
                type="button"
                className="change-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <img
                  alt="change button"
                  src="/images/categories/change-icon.png"
                />
                Change
              </button>
              <img
                className="delete-btn"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl("");
                  setFileType("");
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                alt="delete button"
                src="/images/categories/delete-button.png"
              />
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
      <Dialog
        isOpen={isDialogOpen}
        onClose={onDialogClose}
        title="Cloud URL for your uploaded meme"
      >
        {uploadedLink}
      </Dialog>
    </>
  );
};

export default CategoryMemeForm;
