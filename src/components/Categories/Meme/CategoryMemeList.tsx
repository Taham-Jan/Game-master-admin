import React from "react";
import Header from "../../Header";
import { useNavigate } from "react-router-dom";
import CategoryMemeCard from "./CategoryMemeCard";

const CategoryMemeList = () => {
  const data = [
    {
      _id: "67a1f6dc478387a1c056ec77",

      background: "music-background.jpg",
    },
    {
      _id: "67a1fea93de4ba742ae721ed",

      background: "math-background.jpg",
    },
    {
      _id: "67a1ff1c3de4ba742ae721f1",

      background: "geography-background.jpg",
    },
    {
      _id: "67a671c08c49717f1ddc79a1",

      background: "geography-background.jpg",
    },
    {
      _id: "67aa238eed85a0b1c882a07a",

      background: "geography-background.jpg",
    },
    {
      _id: "67aa2634ed85a0b1c882a080",

      background:
        "https://res.cloudinary.com/dgmbchnny/image/upload/v1739204147/uploads/1739204147302-delete-button.png",
    },
    {
      _id: "67aa6807d523ebe51d366523",

      background:
        "https://res.cloudinary.com/dgmbchnny/image/upload/v1739220998/uploads/1739220997946-volume.png",
    },
    {
      _id: "67b1b51aa71736619cbef621",

      background:
        "https://res.cloudinary.com/dgmbchnny/image/upload/v1739699482/uploads/1739699479445-wali%201.webp",
    },
    {
      _id: "67b1c3c10773cd200ef81f50",

      background:
        "https://res.cloudinary.com/dgmbchnny/image/upload/v1739703232/uploads/1739703232380-wali%201.webp",
    },
    {
      _id: "67b8d3d1e72338a14202799a",

      background:
        "https://res.cloudinary.com/dgmbchnny/image/upload/v1740166094/uploads/1740166093469-wali%201.webp",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Header
        pageTitle="Memes"
        showRightButton={true}
        rightButtonText="Add Meme"
        rightButtonIcon="/images/header/add-icon.png"
        onRightButtonClick={() => navigate("/categories-meme/form")}
        RightButtonProps={{
          rightButtonAxis: "35%",
          rightButtonIconAxis: "18%",
        }}
      />
      <div className="category-list-container">
        {data.map((item, index) => (
          <CategoryMemeCard
            key={item._id || `fallback-key-${index}`}
            // ref={index === data.length - 1 ? lastElementRef : null}
            item={item}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryMemeList;
