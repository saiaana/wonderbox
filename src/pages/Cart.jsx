import { useTranslation } from "react-i18next";
import CartItem from "../components/pages/cart/CartItem";
import CartFooter from "../components/pages/cart/CartFooter";
import EmptyCart from "../components/pages/cart/EmptyCart";
import CartHeader from "../components/pages/cart/CartHeader";
import ConfirmModal from "../components/ui/modals/ConfirmModal";
import { useCartPage } from "../hooks/useCartPage";

export default function Cart() {
  const { t } = useTranslation();
  const {
    cart,
    selected,
    isAllSelected,
    totalPrice,
    handleSelectAll,
    handleSelectOne,
    handleIncrease,
    handleDecrease,
    handleDelete,
    pendingDeleteId,
    confirmDelete,
    cancelDelete,
    clearCartConfirmation,
    confirmClearCart,
    cancelClearCart,
    setClearCartConfirmation,
  } = useCartPage();

  if (cart.length === 0) {
    return (
      <>
        <CartHeader />
        <EmptyCart />
      </>
    );
  }

  return (
    <>
      <div>
        <CartHeader />

        <div className="mx-auto mt-10 max-w-4xl space-y-6 px-4">
          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="peer hidden"
                checked={isAllSelected}
                onChange={handleSelectAll}
              />
              <span className="h-4 w-4 rounded border border-gray-400 peer-checked:border-pink-600 peer-checked:bg-pink-600"></span>
              <span className="font-semibold">{t("common.selectAll")}</span>
            </label>

            <button
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-pink-600"
              onClick={() => setClearCartConfirmation(true)}
            >
              {t("cart.clearCart")}
            </button>
          </div>

          {cart.map((item) => {
            const itemKey = item.variant_id
              ? `${item.product_id}-${item.variant_id}`
              : item.product_id;
            return (
              <CartItem
                key={itemKey}
                item={item}
                isSelected={!!selected[itemKey]}
                handleDecrease={handleDecrease}
                handleIncrease={handleIncrease}
                handleDelete={handleDelete}
                handleSelectOne={handleSelectOne}
              />
            );
          })}
        </div>

        <CartFooter totalPrice={totalPrice} />
      </div>

      <ConfirmModal
        open={!!pendingDeleteId}
        title={t("cart.removeItem")}
        description={t("cart.removeItemConfirm")}
        cancelButtonText={t("common.cancel")}
        confirmButtonText={t("common.remove")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <ConfirmModal
        open={clearCartConfirmation}
        title={t("cart.clearCart")}
        description={t("cart.clearCartConfirm")}
        cancelButtonText={t("common.cancel")}
        confirmButtonText={t("cart.clear")}
        onConfirm={confirmClearCart}
        onCancel={cancelClearCart}
      />
    </>
  );
}
