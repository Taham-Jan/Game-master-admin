import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import Header from "../Header";
import ErrorList from "../ErrorList";
import { uploadFile } from "../../services/UploadService";
import { showNotificationMessage } from "../../utils/toast";
import {
  CreateNewCategory,
  GetCategoryById,
  UpdateNewCategory,
} from "../../services/CategoryService";
import { useNavigate, useParams } from "react-router-dom";
import { handleHttpReq } from "../../utils/HandleHttpReq";
import VideoPlayer from "./Questions/VideoPlayer";
import {
  CreateCategoryPayload,
  CreateCategoryResponse,
} from "../../types/CategoryTypes";
import Loader from "../Loader/loader";

type FormValues = {
  categoryName: string;
  rules: string;
  icon: File | string | null;
  ruleIntroEN: File | string | null;
  ruleIntroAR: File | string | null;
  background: File | string | null;
};

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category name is required"),
  // rules: Yup.string().required("Rules are required"),
  icon: Yup.mixed().required("Icon is required"),
  // animation: Yup.mixed().required("Animation is required"),
  // ruleIntroEN: Yup.mixed().required("Rule intro in english is required"),
  // ruleIntroAR: Yup.mixed().required("Rule intro in arabic is required"),
  // background: Yup.mixed().required("Background is required"),
});

const ImageUploadField = ({
  name,
  label,
  allowVideo = false,
}: {
  name: keyof FormValues;
  label: string;
  allowVideo?: boolean;
}) => {
  const { setFieldValue, values } = useFormikContext<FormValues>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const file = values[name];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFieldValue(name, e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setFieldValue(name, null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  let previewUrl: string | null = null;
  let isVideo = false;
  if (file) {
    if (typeof file === "string") {
      previewUrl = file;
      isVideo = false;
    } else if (file instanceof File) {
      previewUrl = URL.createObjectURL(file);
      isVideo = file.type.startsWith("video");
    }
  }

  return (
    <div className="category-upload-section">
      <h2>{label}</h2>
      <div className="image-upload-container">
        <input
          type="file"
          accept={allowVideo ? "image/*,video/*" : "image/*"}
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {previewUrl ? (
          <div className="image-preview-wrapper">
            {isVideo ? (
              <div className="category-video-preview">
                <VideoPlayer file={file instanceof File ? file : previewUrl} />
              </div>
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="category-image-preview"
                onClick={() => fileInputRef.current?.click()}
              />
            )}
            <button
              type="button"
              className="category-image-remove-btn"
              onClick={handleRemove}
            >
              ×
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="image-button"
            onClick={() => fileInputRef.current?.click()}
          >
            <span>
              <img src="/images/categories/add-image-icon.png" alt={label} />
            </span>
            <span>Add {allowVideo ? "File" : "Image"}</span>
          </button>
        )}
      </div>
    </div>
  );
};

const CategoryForm = () => {
  const { categoryId } = useParams();

  const formikRef = useRef<any>(null);
  const errorListRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [editData, setEditData] = useState<CreateCategoryResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetCategoryById(categoryId);
      setEditData(response.data.data);
    };

    if (categoryId) {
      handleHttpReq(fetchData);
    }
  }, [categoryId]);

  const initialValues: FormValues = {
    categoryName: editData?.name || "",
    rules: editData?.rules || "",
    icon: editData?.icon || null,
    ruleIntroEN: editData?.rulesIntro?.english || null,
    ruleIntroAR: editData?.rulesIntro?.arabic || null,
    background: editData?.background || null,
  };
  const onSubmit = async (values: FormValues, { setSubmitting }: any) => {
    const uploadedUrls: Record<
      "icon" | "ruleIntroEN" | "ruleIntroAR" | "background",
      string
    > = {
      icon:
        typeof values.icon === "string" ? values.icon : editData?.icon || "",
      ruleIntroEN:
        typeof values.ruleIntroEN === "string"
          ? values.ruleIntroEN
          : editData?.rulesIntro?.english || "",
      ruleIntroAR:
        typeof values.ruleIntroAR === "string"
          ? values.ruleIntroAR
          : editData?.rulesIntro?.arabic || "",
      background:
        typeof values.background === "string"
          ? values.background
          : editData?.background || "",
    };

    try {
      for (const key of [
        "icon",
        "ruleIntroEN",
        "ruleIntroAR",
        "background",
      ] as const) {
        if (values[key] && values[key] instanceof File) {
          const formData = new FormData();
          formData.append("file", values[key]);
          const response = await handleHttpReq(() => uploadFile(formData));
          if (response?.data?.url) {
            uploadedUrls[key] = response.data.url;
          } else {
            throw new Error(`Upload failed for ${key}`);
          }
        }
      }

      const categoryData: CreateCategoryPayload = {
        name: values.categoryName,
        rules: values.rules,
        background: uploadedUrls.background,
        icon: uploadedUrls.icon,
        rulesIntro: {
          english: uploadedUrls.ruleIntroEN,
          arabic: uploadedUrls.ruleIntroAR,
        },
      };

      if (categoryId) {
        await handleHttpReq(
          async () => await UpdateNewCategory(categoryId, categoryData)
        );
        showNotificationMessage(
          "Success",
          "Category updated successfully",
          "success"
        );
      } else {
        await handleHttpReq(async () => await CreateNewCategory(categoryData));
        showNotificationMessage(
          "Success",
          "Category created successfully",
          "success"
        );
      }

      navigate("/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      showNotificationMessage("Fail", `Operation failed. ${error}`, "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ handleSubmit, validateForm }) => (
        <Form>
          <Header
            pageTitle={categoryId ? "Edit Category" : "Add Category"}
            showRightButton
            onBackClick={() => navigate("/categories")}
            rightButtonText={categoryId ? "Update" : "Create"}
            rightButtonIcon="/images/header/save-icon.png"
            onRightButtonClick={async () => {
              const errors = await validateForm();
              if (Object.keys(errors).length > 0 && errorListRef.current) {
                errorListRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              } else {
                handleSubmit();
              }
            }}
            RightButtonProps={{
              rightButtonAxis: "40%",
              rightButtonIconAxis: "22%",
            }}
          />
          <div className="category-form-container">
            <div className="category-input-section">
              <h2 className="category-label">Category Name</h2>
              <Field
                name="categoryName"
                className="category-input"
                placeholder="Enter Category Name..."
              />
            </div>

            <div className="category-input-section">
              <h3 className="category-label">
                Rules <span className="optional-span">(optional)</span>
              </h3>
              <Field
                as="textarea"
                name="rules"
                className="category-input"
                placeholder="Enter Rules..."
                rows={5}
              />
            </div>

            <ImageUploadField name="icon" label="Icon" />
            <ImageUploadField name="background" label="Background" />
            {/* <ImageUploadField
              name="ruleIntroEN"
              label="Rules Intro (EN)"
              allowVideo
            />
            <ImageUploadField
              name="ruleIntroAR"
              label="Rules Intro (AR)"
              allowVideo
            /> */}
          </div>
          <div ref={errorListRef}>
            <ErrorList />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
