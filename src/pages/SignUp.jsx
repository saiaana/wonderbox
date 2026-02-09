import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SignUpForm from "../components/ui/forms/SignUpForm";
import ROUTES from "../constants/routes";
import SubmitButton from "../components/ui/forms/SubmitButton";
import AuthFormLayout from "../components/ui/AuthFormLayout";
import Loading from "./Loading";
import useSignUp from "../hooks/useSignUp";

function SignUp() {
  const { t } = useTranslation();
  const {
    formData,
    error,
    isLoading,
    handleChange,
    handleSignUp,
    isAuthInitialized,
  } = useSignUp();

  if (!isAuthInitialized) {
    return <Loading />;
  }

  return (
    <AuthFormLayout
      title={t("auth.createAccount")}
      error={error}
      isLoading={isLoading}
      onSubmit={handleSignUp}
    >
      <SignUpForm formData={formData} onChange={handleChange} />
      <SubmitButton
        isLoading={isLoading}
        text={t("auth.signUp")}
        loadingText={t("auth.creating")}
      />
      <p className="mt-4 text-center text-sm text-gray-600">
        {t("auth.haveAccount")}{" "}
        <Link
          to={ROUTES.login}
          className="font-semibold text-pink-600 hover:underline"
        >
          {t("auth.login")}
        </Link>
      </p>
    </AuthFormLayout>
  );
}

export default SignUp;
