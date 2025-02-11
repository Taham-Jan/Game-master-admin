import CategoryCard from "./CategoryCard";
import { getCategoriesListUrl } from "../../services/CategoryService";
import useListApi from "../../hooks/useListApi";
import { GetCategoriesResponse } from "../../types/CategoryTypes";

const CategoriesList = () => {
  const listUrl = getCategoriesListUrl();
  const { data: CategoryData } = useListApi<GetCategoriesResponse>(listUrl);

  return (
    <>
      <div className="category-list-container">
        {CategoryData.map((item) => (
          <CategoryCard key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default CategoriesList;
