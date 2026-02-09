import { getMaxAvailableQuantity } from "../../../utils/products/getMaxAvailableQuantity";
import { useTranslation } from "react-i18next";

export default function ProductStockStatusNotice({
  hasVariants,
  selectedVariant,
  productStock,
  isOutOfStock,
  stockStatus,
  existingCartQuantity,
}) {
  const { t } = useTranslation();
  if (hasVariants && !selectedVariant) {
    return (
      <p className="text-sm text-amber-600">
        {t("product.selectVariant")}
      </p>
    );
  }

  if (isOutOfStock) {
    return (
      <p className="text-sm text-amber-600">{t("product.outOfStock")}</p>
    );
  }

  const maxQuantity = getMaxAvailableQuantity({
    variantId: selectedVariant?.id || null,
    variantStock: selectedVariant?.variant_stock || null,
    productStock: productStock || null,
  });

  const availableStock = Math.max(0, maxQuantity - existingCartQuantity);

  if (availableStock <= 0) {
    return (
      <p className="text-sm text-amber-600">
        {t("product.maxQuantityReached")}
      </p>
    );
  }

  if (stockStatus === "Low Stock" || availableStock <= 5) {
    return (
      <p className="text-sm text-amber-600">
        {t("product.onlyLeftInStock", { availableStock })}
      </p>
    );
  }

  return null;
}
