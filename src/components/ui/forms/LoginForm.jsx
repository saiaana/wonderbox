import { useTranslation } from "react-i18next";
import InputField from "./InputField";

export default function LoginForm({ formData, onChange }) {
  const { t } = useTranslation();
  const fieldRows = [
    [
      { name: "email", label: t("auth.email"), type: "email", placeholder: t("auth.email") },
      {
        name: "password",
        label: t("auth.password"),
        type: "password",
        placeholder: t("auth.password"),
      },
    ],
  ];

  return (
    <div>
      {fieldRows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((field) => (
            <InputField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={onChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
