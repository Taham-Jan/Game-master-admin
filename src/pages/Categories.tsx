import { useNavigate } from "react-router-dom";
import CategoriesList from "../components/Categories/CategoriesList";
import Header from "../components/Header";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header
        pageTitle="Categories"
        showRightButton={true}
        rightButtonText="Add Category"
        rightButtonIcon="/images/header/add-icon.png"
        onRightButtonClick={() => navigate("/categories-form")}
        RightButtonProps={{
          rightButtonAxis: "30%",
          rightButtonIconAxis: "13%",
        }}
      />
      <CategoriesList />
    </>
  );
};

export default Categories;
