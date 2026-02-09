import { useTranslation } from "react-i18next";
export default function DescriptionSection({ formData, handleInputChange }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-stone-800">
        {t("product.description")}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700">
            {t("product.description")}
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            {t("product.howToUse")}
          </label>
          <textarea
            name="how_to_use"
            value={formData.how_to_use}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            {t("product.ingredients")}
          </label>
          <textarea
            name="ingridients"
            value={formData.ingridients}
            onChange={handleInputChange}
            rows={3}
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            {t("product.volume")}
          </label>
          <input
            type="text"
            name="volume"
            value={formData.volume}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 focus:border-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
        </div>
      </div>
    </div>
  );
}
