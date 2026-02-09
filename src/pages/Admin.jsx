import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ROUTES from "../constants/routes";
import Loading from "./Loading";
import AdminMenuItem from "../components/pages/admin/AdminMenuItem";
import AdminQuickActions from "../components/pages/admin/AdminQuickActions";
import { getAdminMenuItemsForRole } from "../constants/adminMenu";
import useLogout from "../hooks/useLogout";
import ConfirmModal from "../components/ui/modals/ConfirmModal";

export default function Admin() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const isAuthInitialized = useSelector((state) => state.auth.initialized);

  const {
    isConfirmOpen,
    requestLogout,
    cancelLogout,
    confirmLogout,
    isLoading,
  } = useLogout();

  if (!isAuthInitialized) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to={ROUTES.login} replace />;
  }

  const userRole = user?.role || "user";
  const adminMenuItems = getAdminMenuItemsForRole(userRole);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-extrabold text-stone-800">
            {t("admin.admin")}
          </h1>
        </div>

        <button
          onClick={requestLogout}
          disabled={isLoading}
          className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:opacity-50"
        >
          {t("auth.logout")}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminMenuItems.map((item) => (
          <AdminMenuItem
            key={item.link}
            title={item.title}
            icon={item.icon}
            link={item.link}
            color={item.color}
            description={item.description}
          />
        ))}
      </div>
      <AdminQuickActions />

      <ConfirmModal
        open={isConfirmOpen}
        title={t("auth.logout")}
        description={t("admin.logoutConfirm")}
        cancelButtonText={t("common.cancel")}
        confirmButtonText={t("auth.logout")}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}
