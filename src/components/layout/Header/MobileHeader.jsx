import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import NavBlock from "./NavBlock";
import { MENU_ITEMS } from "../../../constants/menuItems";
import ROUTES from "../../../constants/routes";
import { ROLES } from "../../../constants/roles";
import LanguageSwitcher from "../../common/LanguageSwitcher";

export default function MobileHeader() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum) => sum + 1, 0)
  );
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === ROLES.ADMIN;

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((v) => !v);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeMenu();
    }
    if (isMenuOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  return (
    <>
      <div className="fixed top-0 z-50 w-full border-b border-stone-200 bg-white/95 backdrop-blur-sm md:hidden">
        <div className="flex h-12 items-center justify-between px-3 sm:h-14 sm:px-4">
          <Link
            to={ROUTES.home}
            className="text-lg font-semibold tracking-tight transition-colors duration-300 hover:text-pink-600 sm:text-xl md:text-2xl"
            aria-label={t("common.goToHome")}
          >
            {t("common.wonderbox")}
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <NavBlock color="black" cartCount={cartCount} isAdmin={isAdmin} />
            <BurgerButton onClick={toggleMenu} isOpen={isMenuOpen} />
          </div>
        </div>
      </div>

      <div
        className={[
          "fixed inset-0 z-40 transition-opacity duration-300 md:hidden",
          isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0",
          "bg-black/40",
        ].join(" ")}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className={[
          "fixed bottom-0 left-0 z-50 w-full md:hidden",
          "rounded-t-2xl bg-white p-4 shadow-[0_-20px_60px_rgba(0,0,0,0.18)]",
          "transition-transform duration-300 ease-out",
          "max-h-[85vh] overflow-y-auto",
          isMenuOpen ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300 sm:mb-6 sm:w-16" />

        <ul className="space-y-3 text-base uppercase tracking-wide sm:space-y-4 sm:text-lg">
          {MENU_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                onClick={closeMenu}
                className="block w-full border-b border-stone-100 pb-3 text-left transition-colors hover:text-pink-600 active:text-pink-600 sm:pb-4"
              >
                {t(`menu.${item.label}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function BurgerButton({ onClick, isOpen }) {
  const { t } = useTranslation();
  
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center p-1.5 transition active:scale-90 sm:p-2"
      aria-label={isOpen ? t("common.closeMenu") : t("common.openMenu")}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 sm:h-6 sm:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      )}
    </button>
  );
}
