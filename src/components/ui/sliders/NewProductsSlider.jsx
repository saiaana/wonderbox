import { fetchNewProducts } from "../../../store/slices/productsSlice";
import {
  selectNewProducts,
  selectNewProductsStatus,
} from "../../../store/slices/productsSlice";
import Slider from "./Slider.jsx";
import Loading from "../../../pages/Loading";
import useSliderProducts from "../../../hooks/useSliderProducts.js";
import { useTranslation } from "react-i18next";

function NewProductsSlider() {
  const { t } = useTranslation();
  const { products: newProducts, status } = useSliderProducts({
    productsSelector: selectNewProducts,
    statusSelector: selectNewProductsStatus,
    fetchAction: fetchNewProducts,
  });

  if (status === "loading") {
    return <Loading />;
  }

  if (newProducts && newProducts.length === 0) return null;

  return (
    <Slider
      products={newProducts}
      title={t("menu.new", { defaultValue: "NEW" })}
    />
  );
}

export default NewProductsSlider;
