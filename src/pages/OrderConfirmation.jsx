import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getOrderById } from "../api/ordersApi";
import OrderItemInfo from "../components/pages/order/OrderItemInfo";
import OrderInformation from "../components/pages/order/OrderInformation";
import OrderNotFound from "../components/pages/order/OrderNotFound";
import Loading from "./Loading.jsx";

function OrderConfirmation() {
  const { t } = useTranslation();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderById(orderId);
        setOrder(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <Loading />;
  }

  if (error || !order) {
    return <OrderNotFound />;
  }


  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4">
      <h1 className="mb-8 text-3xl font-extrabold text-stone-800">{t("order.orderConfirmation")}</h1>
      <OrderInformation order={order} />
      <OrderItemInfo order={order} />
    </div>
  );
}

export default OrderConfirmation;
