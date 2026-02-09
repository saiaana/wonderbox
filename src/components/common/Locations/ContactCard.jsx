import { useTranslation } from "react-i18next";

function ContactCard({ type, title, value, link, icon: Icon, onClick, isSelected }) {
  const { t } = useTranslation();

  const labels = {
    email: t("contact.email.title"),
    phone: t("contact.phone.title"),
    address: title || "",
  };

  const displayTitle = labels[type] || title;
  const displayValue = value;

  const cardContent = (
    <>
      <div
        className={`
          mb-4 flex h-12 w-12 items-center justify-center rounded-full
          transition-colors duration-300
          ${
            isSelected
              ? "bg-pink-600"
              : "bg-stone-100 group-hover:bg-pink-100"
          }
        `}
      >
        <Icon
          className={`h-6 w-6 transition-colors duration-300 ${
            isSelected
              ? "text-white"
              : "text-stone-600 group-hover:text-pink-600"
          }`}
        />
      </div>
      <div className="flex-1">
        {displayTitle && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-500">
            {displayTitle}
          </p>
        )}
        <p
          className={`
            text-base font-bold transition-colors
            ${
              isSelected
                ? "text-pink-600"
                : "text-stone-800 group-hover:text-pink-600"
            }
          `}
        >
          {displayValue}
        </p>
      </div>
    </>
  );

  const className = `
    group flex h-full flex-col rounded-xl border-2 bg-white p-6
    transition-all duration-300
    ${
      isSelected
        ? "border-pink-500 bg-pink-50 shadow-lg shadow-pink-500/10"
        : "border-stone-200 hover:border-pink-300 hover:shadow-md"
    }
  `;

  if (onClick) {
    return (
      <div onClick={onClick} className={`${className} cursor-pointer`}>
        {cardContent}
      </div>
    );
  }

  return (
    <a href={link} className={className}>
      {cardContent}
    </a>
  );
}

export default ContactCard;
