import { useMemo } from "react";
import LinkGrid from "../components/common/LinkGrid";
import { useProductsPage } from "../hooks/useProductsPage";
import Loading from "./Loading";
import ROUTES from "../constants/routes";

function CategoriesList() {
  const { categories, status } = useProductsPage();

  const getHref = (category) => {
    return ROUTES.category(category);
  }
  const getAriaLabel = (category) => {
    return `Category ${category}`;
  }

  const normalizedCategoriesList = useMemo(
    () =>
      categories?.map((category) =>
        typeof category === "string" ? category : category.title
      ) || [],
    [categories]
  );

  if (status === "loading" || status === "idle") {
    return <Loading />;
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-gray-500">No categories found.</p>
      </div>
    );
  }

  return (
    <LinkGrid
      title="categories"  
      items={normalizedCategoriesList}
      getHref={getHref}
      getAriaLabel={getAriaLabel}
      emptyText="No categories found."
    />
  );
}

export default CategoriesList;
