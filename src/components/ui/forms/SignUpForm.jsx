import { useTranslation } from "react-i18next";
import InputField from "./InputField";

function SignUpForm({ formData, onChange }) {
  const { t } = useTranslation();
  const fieldRows = [
    [
      { name: "email", label: t("auth.email"), type: "email", placeholder: t("auth.email") },
      {
        name: "firstName",
        label: t("auth.firstName"),
        type: "text",
        placeholder: t("auth.firstName"),
      },
      {
        name: "lastName",
        label: t("auth.lastName"),
        type: "text",
        placeholder: t("auth.lastName"),
      },
      {
        name: "password",
        label: t("auth.password"),
        type: "password",
        placeholder: t("auth.password"),
        instructions: t("auth.passwordInstructions"),
      },
      {
        name: "confirmPassword",
        label: t("auth.confirmPassword"),
        type: "password",
        placeholder: t("auth.confirmPassword"),
      },
    ],
  ];

  return (
    <>
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
              instructions={field.instructions || ""}
            />
          ))}
        </div>
      ))}
    </>
  );
}

export default SignUpForm;
