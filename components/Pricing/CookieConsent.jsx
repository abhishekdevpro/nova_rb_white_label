// components/CookieConsent.js
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

const CookieConsent = () => {
  const { t } = useTranslation();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieAccepted = localStorage.getItem("cookieAccepted");
    if (!cookieAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-4 px-6 shadow-lg border-t flex flex-col sm:flex-row justify-between items-center gap-4 z-50">
      <div>
        <p className="text-sm sm:text-base">
          {t("cookie.message")}{" "}
          <Link
            href="/privacy-policy"
            className="text-blue-600 hover:underline"
          >
            {t("cookie.cookiePolicy")}
          </Link>{" "}
          {t("cookie.and")}{" "}
          <Link
            href="/terms&conditions"
            className="text-blue-600 hover:underline"
          >
            {t("cookie.privacyPolicy")}
          </Link>
          .
        </p>
      </div>
      <button
        onClick={acceptCookies}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded text-sm sm:text-base"
      >
        {t("cookie.button")}
      </button>
    </div>
  );
};

export default CookieConsent;
