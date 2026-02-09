import CartItem from "../components/pages/cart/CartItem";
import CartFooter from "../components/pages/cart/CartFooter";
import EmptyCart from "../components/pages/cart/EmptyCart";
import CartHeader from "../components/pages/cart/CartHeader";
import ConfirmModal from "../components/ui/modals/ConfirmModal";
import { useCartPage } from "../hooks/useCartPage";
import { cartConfig } from "../config/cart";

export default function Cart() {
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
        <div className="border-b border-stone-200 py-6">
          <h1 className="text-center text-3xl font-extrabold tracking-wide text-stone-800">
            {cartConfig.title}
          </h1>
        </div>

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
              <span className="font-semibold">Select all</span>
            </label>

            <button
              className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-pink-600"
              onClick={() => setClearCartConfirmation(true)}
            >
              {cartConfig.action.clearCart}
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
        title={cartConfig.modals.removeItem.title}
        description={cartConfig.modals.removeItem.description}
        cancelButtonText={cartConfig.modals.removeItem.cancel}
        confirmButtonText={cartConfig.modals.removeItem.confirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <ConfirmModal
        open={clearCartConfirmation}
        title={cartConfig.modals.clearCart.title}
        description={cartConfig.modals.clearCart.description}
        cancelButtonText={cartConfig.modals.clearCart.cancel}
        confirmButtonText={cartConfig.modals.clearCart.confirm}
        onConfirm={confirmClearCart}
        onCancel={cancelClearCart}
      />
    </>
  );
}
