import OrderCard from "./OrderCard";
import { useTranslation } from "react-i18next";

function OrderList({ loading, error, orders }) {
  const { t } = useTranslation();
  if (loading) {
    return <p className="text-sm text-stone-500">{t("order.loadingOrders")}</p>;
  }

  if (error) {
    return <p className="text-sm text-pink-600">Error: {error}</p>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-stone-800"> {t("order.orderHistory")} </h2>
        <p className="text-sm text-stone-600"> {t("order.noOrders")} </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-stone-800">{t("order.orderHistory")}</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderList;
