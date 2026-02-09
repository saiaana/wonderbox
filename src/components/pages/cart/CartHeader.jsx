import { memo } from "react";
import { useTranslation } from "react-i18next";

function CartHeader() {
  const { t } = useTranslation();
  
  return (
    <div className="border-b border-stone-200 py-6">
      <h1 className="text-center text-3xl font-extrabold tracking-wide text-stone-800">
        {t("cart.title")}
      </h1>
    </div>
  );
}

export default memo(CartHeader);
