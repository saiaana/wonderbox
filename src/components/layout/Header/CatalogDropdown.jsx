import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoriesStatus,
  fetchCategories,
} from "../../../store/slices/productsSlice";
import CatalogDropDownView from "./CatalogDropDownView";

function CatalogDropdown({ closeDropdown }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const categoriesStatus = useSelector(selectCategoriesStatus);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);

  const categoryLabels = categories.map((category) =>
    typeof category === "string"
      ? category
      : category.name || category.title || category
  );
  return (
    <CatalogDropDownView onClose={closeDropdown} labels={categoryLabels} />
  );
}

export default CatalogDropdown;
