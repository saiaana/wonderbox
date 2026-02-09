import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LoginForm from "../components/ui/forms/LoginForm";
import ROUTES from "../constants/routes";
import SubmitButton from "../components/ui/forms/SubmitButton";
import AuthFormLayout from "../components/ui/AuthFormLayout";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { t } = useTranslation();
  const { formData, error, isLoading, handleChange, handleLogin } = useLogin();

  return (
    <AuthFormLayout
      title={t("auth.login")}
      error={error}
      isLoading={isLoading}
      onSubmit={handleLogin}
    >
      <LoginForm formData={formData} onChange={handleChange} />
      <SubmitButton
        isLoading={isLoading}
        text={t("auth.login")}
        loadingText={t("auth.loggingIn")}
      />
      <p className="mt-4 text-center text-sm text-gray-600">
        {t("auth.noAccount")} {"  "}
        <Link
          to={ROUTES.signup}
          className="font-semibold text-pink-600 hover:underline"
        >
          {t("auth.signup")}
        </Link>
      </p>
    </AuthFormLayout>
  );
}
