import { useTranslation } from "react-i18next";

export default function ProductStockStatusBadge({
  stockStatus,
  stockQuantity,
}) {
  const { t } = useTranslation();

  return stockStatus === "In Stock" ? (
    <div className="w-fit rounded-full border border-green-400 bg-green-100 px-2 py-1 text-center text-xs font-medium text-green-800">
      {t("product.inStock")}
    </div>
  ) : stockStatus === "Out of Stock" ? (
    <div className="w-fit rounded-full border border-red-400 bg-red-100 px-2 py-1 text-center text-xs font-medium text-red-800">
      {t("product.outOfStock")}
    </div>
  ) : stockStatus === "Low Stock" ? (
    <div className="w-fit rounded-full border border-yellow-400 bg-yellow-100 px-2 py-1 text-center text-xs font-medium text-yellow-800">
      {t("product.lowStock")} ({stockQuantity})
    </div>
  ) : null;
}
