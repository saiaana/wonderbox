import { fetchBestsellerProducts } from "../../../store/slices/productsSlice";
import {
  selectBestsellerProducts,
  selectBestsellerProductsStatus,
} from "../../../store/slices/productsSlice";
import Slider from "./Slider";
import Loading from "../../../pages/Loading";
import useSliderProducts from "../../../hooks/useSliderProducts.js";
import { useTranslation } from "react-i18next";

function BestsellersSlider() {
  const { t } = useTranslation();
  const { products: bestsellerProducts, status } = useSliderProducts({
    productsSelector: selectBestsellerProducts,
    statusSelector: selectBestsellerProductsStatus,
    fetchAction: fetchBestsellerProducts,
  });

  if (status === "loading") {
    return <Loading />;
  }

  if (bestsellerProducts && bestsellerProducts.length === 0) return null;

  return <Slider products={bestsellerProducts} title={t("menu.bestsellers")} />;
}

export default BestsellersSlider;
