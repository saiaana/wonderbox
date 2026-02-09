import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProductInfoBlock from "./ProductInfoBlock";

function ProductDescriptionBlock({
  description,
  howToUse,
  volume,
  ingridients,
}) {
  const { t } = useTranslation();
  const [showIngredients, setShowIngredients] = useState(false);

  return (
    <div className="space-y-4 text-sm text-stone-700">
      <ProductInfoBlock title={t("product.description")} value={description} />
      <ProductInfoBlock title={t("product.howToUse")} value={howToUse} />
      <ProductInfoBlock title={t("product.volume")} value={volume} />

      <button
        onClick={() => setShowIngredients((v) => !v)}
        className="w-fit text-sm font-semibold text-stone-800 hover:text-pink-600"
      >
        {showIngredients ? t("product.hideIngredients") : t("product.showIngredients")}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          showIngredients ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ProductInfoBlock
          title={t("product.ingredients")}
          value={ingridients}
          textSize="text-xs sm:text-sm"
        />
      </div>
    </div>
  );
}

export default ProductDescriptionBlock;
