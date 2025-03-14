import React, { useEffect, useRef, useState } from "react";
import { Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import Header from "../../Header";
import "../../../styles/CategoryQuestion.css";
import AudioPlayer from "./AudioPlayer";
import VideoPlayer from "./VideoPlayer";
import ErrorList from "../../ErrorList";
import {
  createNewCategoryQuestion,
  getCategoryQuestionById,
  updateCategoryQuestion,
} from "../../../services/QuestionService";
import { useNavigate, useParams } from "react-router-dom";
import {
  AgeRanges,
  AgeRangeType,
  CategoryQuestionResponse,
} from "../../../types/QuestionTypes";
import { uploadFile } from "../../../services/UploadService";
import { handleHttpReq } from "../../../utils/HandleHttpReq";
import { showNotificationMessage } from "../../../utils/toast";
import SelectBox from "../../Shared/SelectBox";
import CustomCheckBox from "../../Shared/CustomCheckBox";
import MultiSelectCheckBox from "../../Shared/MultiSelectCheckBox";

enum QuestionMode {
  TEXT = "Text Mode",
  VIDEO = "Video Mode",
  IMAGE = "Image Mode",
  SOUND = "Sound Mode",
}

const validationSchema = Yup.object().shape({
  questionText: Yup.object().shape({
    en: Yup.string().when("$questionMode", {
      is: QuestionMode.TEXT,
      then: (schema) => schema.required("Question text is required (EN)"),
      otherwise: (schema) => schema.notRequired(),
    }),
    ar: Yup.string().when("$questionMode", {
      is: QuestionMode.TEXT,
      then: (schema) => schema.required("Question text is required (AR)"),
      otherwise: (schema) => schema.notRequired(),
    }),
  }),
  selectedAnswer: Yup.string().required("Please select the correct answer"),
  answers: Yup.object().shape({
    A: Yup.object().shape({
      en: Yup.string().required("Answer A is Required (EN)"),
      ar: Yup.string().required("Answer A is Required (AR)"),
    }),
    B: Yup.object().shape({
      en: Yup.string().required("Answer B is Required (EN)"),
      ar: Yup.string().required("Answer B is Required (AR)"),
    }),
    C: Yup.object().shape({
      en: Yup.string().required("Answer C is Required (EN)"),
      ar: Yup.string().required("Answer C is Required (AR)"),
    }),
    D: Yup.object().shape({
      en: Yup.string().required("Answer D is Required (EN)"),
      ar: Yup.string().required("Answer D is Required (AR)"),
    }),
  }),
  selectedFile: Yup.mixed().when("$questionMode", {
    is: (mode: QuestionMode | undefined) => mode !== QuestionMode.TEXT,
    then: (schema) => schema.required("File is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // ageRange: Yup.string().required("Age range is required"),
  ageRange: Yup.array().min(1, "Please select at least one age range"),
});

function convertServerQuestionMode(questionType: string): QuestionMode {
  switch (questionType.toLowerCase()) {
    case "text":
      return QuestionMode.TEXT;
    case "image":
      return QuestionMode.IMAGE;
    case "video":
      return QuestionMode.VIDEO;
    case "audio":
      return QuestionMode.SOUND;
    default:
      return QuestionMode.TEXT;
  }
}

function convertQuestionModeForServer(questionType: QuestionMode): string {
  switch (questionType) {
    case QuestionMode.TEXT:
      return "text";
    case QuestionMode.IMAGE:
      return "image";
    case QuestionMode.VIDEO:
      return "video";
    case QuestionMode.SOUND:
      return "audio";
    default:
      return "text";
  }
}

type FormValueType = {
  questionMode: QuestionMode;
  questionText: { en: string; ar: string };
  answers: { [key: string]: { ar: string; en: string } };
  selectedAnswer: string | null;
  selectedFile: File | string | null;
  ageRange: AgeRangeType[];
};

const CategoryQuestionForm: React.FC = () => {
  const navigate = useNavigate();
  const { categoryId, id } = useParams();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const errorListRef = useRef<HTMLDivElement | null>(null);
  const [editData, setEditData] = useState<CategoryQuestionResponse | null>(
    null
  );

  const getUploadIcon = (questionMode: QuestionMode) => {
    switch (questionMode) {
      case QuestionMode.VIDEO:
        return "/images/categories/video-plus-icon.png";
      case QuestionMode.SOUND:
        return "/images/categories/sound-plus-icon.png";
      case QuestionMode.IMAGE:
        return "/images/categories/image-plus-icon.png";
      default:
        return "";
    }
  };

  const getInstructionText = (questionMode: QuestionMode) => {
    switch (questionMode) {
      case QuestionMode.VIDEO:
        return "Please upload a video for the question.";
      case QuestionMode.SOUND:
        return "Please upload a sound for the question.";
      case QuestionMode.IMAGE:
        return "Please upload an image for the question.";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategoryQuestionById(id);
      setEditData(response.data.data);
    };

    if (id) {
      handleHttpReq(fetchData);
    }
  }, [id]);

  const initialValues: FormValueType = {
    questionMode: convertServerQuestionMode(editData?.questionType || "text"),
    questionText: editData?.text || { en: "", ar: "" },
    answers: editData?.options || {
      A: { en: "", ar: "" },
      B: { en: "", ar: "" },
      C: { en: "", ar: "" },
      D: { en: "", ar: "" },
    },
    selectedAnswer: editData?.correctAnswer || (null as string | null),
    selectedFile: editData?.media || (null as File | string | null),
    ageRange: editData?.ageRange || [],
  };

  const handleSubmit = async (values: FormValueType) => {
    let uploadedLink: string | null = null;

    if (values.selectedFile) {
      if (typeof values.selectedFile === "string") {
        uploadedLink = values.selectedFile;
      } else if (values.selectedFile instanceof File) {
        const formData = new FormData();
        formData.append("file", values.selectedFile);

        const response = await handleHttpReq(
          (controller) => uploadFile(formData, controller),
          "Uploading"
        );
        if (!response) return;
        uploadedLink = response?.data?.url ?? null;
      }
    }

    await handleHttpReq(async () => {
      if (id) {
        await updateCategoryQuestion(id, {
          ageRange: values.ageRange,
          categoryId: categoryId,
          correctAnswer: values.selectedAnswer,
          options: values.answers,
          questionType: convertQuestionModeForServer(values.questionMode),
          media: uploadedLink || undefined,
          text: values.questionText,
        });
      } else {
        await createNewCategoryQuestion({
          ageRange: values.ageRange,
          categoryId: categoryId,
          correctAnswer: values.selectedAnswer,
          options: values.answers,
          questionType: convertQuestionModeForServer(values.questionMode),
          media: uploadedLink || undefined,
          text: values.questionText,
        });
      }

      showNotificationMessage(
        "Success",
        `Successfully ${id ? `Updated` : `Created New`} Question`,
        "success"
      );
      navigate(-1);
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, handleSubmit, validateForm }) => (
        <>
          <Header
            pageTitle={`${id ? `Update` : `Create`} Question`}
            showRightButton={true}
            rightButtonText="Save"
            rightButtonIcon="/images/header/save-icon.png"
            onBackClick={() => navigate(`/categories-questions/${categoryId}`)}
            onRightButtonClick={async () => {
              const errors = await validateForm();
              if (Object.keys(errors).length > 0) {
                if (errorListRef.current) {
                  errorListRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }
              } else {
                handleSubmit();
              }
            }}
            RightButtonProps={{
              rightButtonAxis: "44%",
              rightButtonIconAxis: "25%",
            }}
          />
          <div className="adaptable-container">
            <div className="question-select-box-container">
              <SelectBox
                label="Question Mode"
                value={values.questionMode}
                options={Object.values(QuestionMode)}
                onChange={(e) => {
                  const newMode = e.target.value;
                  setFieldValue("questionMode", newMode);
                  setFieldValue("selectedFile", null);
                  setFieldValue("questionText", { en: "", ar: "" });
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                disabled={!!id}
              />
              {/* <SelectBox
                label="Age Range"
                value={values.ageRange}
                options={AgeRanges}
                onChange={(e) => {
                  setFieldValue("ageRange", e.target.value);
                }}
              /> */}
              <Field
                name="ageRange"
                component={MultiSelectCheckBox}
                options={AgeRanges}
                label="Age Range"
              />
            </div>
            <div className="language-toggle">
              <button
                type="button"
                className={language === "en" ? "active" : ""}
                onClick={() => setLanguage("en")}
              >
                English
              </button>
              <button
                type="button"
                className={language === "ar" ? "active" : ""}
                onClick={() => setLanguage("ar")}
              >
                Arabic
              </button>
            </div>
            <div className="question-container">
              {values.questionMode === QuestionMode.TEXT ? (
                <textarea
                  value={values.questionText[language]}
                  onChange={(e) =>
                    setFieldValue(`questionText.${language}`, e.target.value)
                  }
                  placeholder={`Please create the question text (${language})`}
                  className="question-input"
                  maxLength={250}
                />
              ) : (
                <>
                  <textarea
                    value={values.questionText[language]}
                    onChange={(e) =>
                      setFieldValue(`questionText.${language}`, e.target.value)
                    }
                    placeholder={`Please create the question text (${language})`}
                    className="question-input"
                    maxLength={250}
                  />

                  {values.selectedFile ? (
                    <>
                      <p className="question-instruction">
                        {getInstructionText(values.questionMode)}
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
                              setFieldValue("selectedFile", null);
                              if (fileInputRef.current)
                                fileInputRef.current.value = "";
                            }}
                            alt="delete button"
                            src="/images/categories/delete-button.png"
                          />
                        </div>
                      </p>
                      <div className="question-uploaded-button">
                        {values.questionMode === QuestionMode.VIDEO && (
                          <VideoPlayer file={values.selectedFile} />
                        )}
                        {values.questionMode === QuestionMode.SOUND && (
                          <AudioPlayer file={values.selectedFile} />
                        )}
                        {values.questionMode === QuestionMode.IMAGE && (
                          <img
                            src={
                              values.selectedFile instanceof File
                                ? URL.createObjectURL(values.selectedFile)
                                : values.selectedFile
                            }
                            alt="Uploaded"
                            className="uploaded-media"
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="question-instruction">
                        {getInstructionText(values.questionMode)}
                      </p>
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="question-upload-button"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="question-upload-content">
                          <img
                            src={getUploadIcon(values.questionMode)}
                            alt="Upload Icon"
                            className="question-uploaded-image"
                          />
                          <span>Please click to upload </span>
                        </div>
                      </div>
                    </>
                  )}
                  <input
                    type="file"
                    accept={
                      values.questionMode === QuestionMode.VIDEO
                        ? "video/*"
                        : values.questionMode === QuestionMode.SOUND
                        ? "audio/*"
                        : values.questionMode === QuestionMode.IMAGE
                        ? "image/*"
                        : "*/*"
                    }
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFieldValue("selectedFile", e.target.files?.[0] || null)
                    }
                  />
                </>
              )}
            </div>

            <div className="answer-button-group">
              {(["A", "B", "C", "D"] as const).map((letter) => (
                <>
                  <div
                    key={letter}
                    className={`answer-button 
                      `}
                    // ${values.selectedAnswer === letter ? "selected" : ""}
                  >
                    <CustomCheckBox
                      checked={values.selectedAnswer === letter}
                      onChange={() => setFieldValue("selectedAnswer", letter)}
                      size={32}
                    />
                    <label htmlFor={`answer${letter}`}>
                      {letter}.{/* ({language.toUpperCase()}) */}
                    </label>
                    <input
                      id={`answer${letter}`}
                      type="text"
                      value={values.answers[letter][language]}
                      onChange={(e) =>
                        setFieldValue(
                          `answers.${letter}.${language}`,
                          e.target.value
                        )
                      }
                      placeholder={`Enter the answer text (${language.toUpperCase()})`}
                    />
                  </div>
                </>
              ))}
            </div>
          </div>
          <div ref={errorListRef}>
            <ErrorList />
          </div>
        </>
      )}
    </Formik>
  );
};

export default CategoryQuestionForm;
