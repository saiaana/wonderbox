import { getMainImageUrl, formatPriceNumber } from "../utils/helpers";
import { getProductSlug } from "../utils/products/getProductSlug";
import { checkStockAvailability } from "../utils/products/checkStockAvailability";
import { useMemo } from "react";
import { exceededMaxAvailableQuantity } from "../utils/products/getMaxAvailableQuantity";

export default function useCartItem({ item }) {
  const mainImage = getMainImageUrl(item.images);

  const productSlug = useMemo(
    () => getProductSlug(item.product_id, item.title || item.name),
    [item.product_id, item.title, item.name]
  );

  const productTotal = (finalPrice, quantity) => {
    const price = finalPrice || 0;
    return formatPriceNumber(Number(price) * Number(quantity));
  };

  const originalPrice = formatPriceNumber(item.price);
  const salePrice = formatPriceNumber(item.finalPrice);
  const isOnSale = item.on_sale && salePrice < originalPrice;
  const displayTitle = item.title || item.name || `Product #${item.product_id}`;
  const displayTotal = productTotal(salePrice || originalPrice, item.quantity);

  const isExceededMaxAvailableQuantity = useMemo(() => {
    return exceededMaxAvailableQuantity({
      variantId: item.variant_id,
      variantStock: item.variant_stock,
      productStock: item.stock,
      quantity: item.quantity,
    });
  }, [item.variant_id, item.variant_stock, item.stock, item.quantity]);

  const isOutOfStock = useMemo(() => {
    return checkStockAvailability({
      variantId: item.variant_id,
      variantStock: item.variant_stock,
      productStock: item.stock,
    });
  }, [item.variant_id, item.variant_stock, item.stock]);


  const isInactive = useMemo(() => {

    if (item.variant_id) {
      return item.variant_is_active === false;
    }
    return item.product_is_active === false;
  }, [item.variant_id, item.variant_is_active, item.product_is_active]);

  const isUnavailable = isInactive || isOutOfStock;

  return {
    mainImage,
    productSlug,
    isOnSale,
    salePrice,
    originalPrice,
    displayTitle,
    displayTotal,
    isOutOfStock,
    isInactive,
    isUnavailable,
    exceededMaxAvailableQuantity: isExceededMaxAvailableQuantity,
  };
}
