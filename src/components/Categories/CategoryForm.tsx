import React, { useRef } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import Header from "../Header";
import ErrorList from "../ErrorList";
import { uploadFile } from "../../services/UploadService";
import { showNotificationMessage } from "../../utils/toast";
import { CreateNewCategory } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";
import { handleHttpReq } from "../../utils/HandleHttpReq";

type FormValues = {
  categoryName: string;
  rules: string;
  icon: File | null;
  animation: File | null;
  background: File | null;
};

const validationSchema = Yup.object().shape({
  categoryName: Yup.string().required("Category name is required"),
  rules: Yup.string().required("Rules are required"),
  icon: Yup.mixed().required("Icon is required"),
  animation: Yup.mixed().required("Animation is required"),
  background: Yup.mixed().required("Background is required"),
});

const initialValues: FormValues = {
  categoryName: "",
  rules: "",
  icon: null,
  animation: null,
  background: null,
};

const ImageUploadField = ({
  name,
  label,
}: {
  name: keyof FormValues;
  label: string;
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

  return (
    <div className="category-upload-section">
      <h2>{label}</h2>
      <div className="image-upload-container">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {file ? (
          <div className="image-preview-wrapper">
            <img
              src={URL.createObjectURL(file as Blob)}
              alt="Preview"
              className="category-image-preview"
              onClick={() => fileInputRef.current?.click()}
            />
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
            <span>Add Image</span>
          </button>
        )}
      </div>
    </div>
  );
};

const CategoryForm = () => {
  const formikRef = useRef<any>(null);
  const errorListRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (values: FormValues, { setSubmitting }: any) => {
    const uploadedUrls: Record<"icon" | "animation" | "background", string> = {
      icon: "",
      animation: "",
      background: "",
    };

    const uploadedFiles: Record<string, File> = {};
    try {
      for (const key of ["icon", "animation", "background"] as const) {
        if (values[key]) {
          const formData = new FormData();
          formData.append("file", values[key]);

          let uploadedLink;
          handleHttpReq(async () => {
            const response = await uploadFile(formData);
            uploadedLink = response?.data?.url;
          });

          if (uploadedLink) {
            uploadedUrls[key] = uploadedLink;
            uploadedFiles[key] = values[key];
          } else {
            throw new Error(`Upload failed for ${key}`);
          }
        }
      }

      const categoryData = {
        name: values.categoryName,
        rules: values.rules,
        ...uploadedUrls,
      };

      handleHttpReq(async () => {
        await CreateNewCategory(categoryData);
      });

      showNotificationMessage(
        "Success",
        `Successfully created new category`,
        "success"
      );
      navigate("/categories");
    } catch (error) {
      console.error("Upload failed, rolling back:", error);
      showNotificationMessage(
        "Fail",
        `Upload failed. Rolling back uploaded files. ${error}`,
        "error"
      );

      for (const key in uploadedFiles) {
        try {
          console.log(`Rolling back file: ${key}`);
        } catch (rollbackError) {
          console.error(`Rollback failed for ${key}:`, rollbackError);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, validateForm }) => (
        <Form>
          <Header
            pageTitle="Add Create"
            showRightButton={true}
            rightButtonText="Create"
            rightButtonIcon="/images/header/save-icon.png"
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
                placeholder="Please Write Category Name..."
              />
            </div>

            <div className="category-input-section">
              <h3 className="category-label">Rules</h3>
              <Field
                as="textarea"
                name="rules"
                className="category-input"
                placeholder="Please Write Rules..."
                rows={5}
              />
            </div>

            <ImageUploadField name="icon" label="Icon" />
            <ImageUploadField name="animation" label="Animation" />
            <ImageUploadField name="background" label="Background" />
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
