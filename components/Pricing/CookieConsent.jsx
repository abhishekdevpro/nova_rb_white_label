// components/CookieConsent.js

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieAccepted = localStorage.getItem("cookieAccepted");

    // Only show banner if they haven't accepted yet
    if (!cookieAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    // Save to localStorage that user has accepted cookies
    localStorage.setItem("cookieAccepted", "true");
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-4 px-6 shadow-lg border-t flex flex-col sm:flex-row justify-between items-center gap-4 z-50">
      <div>
        <p className="text-sm sm:text-base">
          This site uses cookies to ensure you get the best experience on our
          website. To learn more visit our{" "}
          <Link
            href="/footers/PrivacyPolicy"
            className="text-[#f2931c] hover:underline"
          >
            Cookie policy
          </Link>{" "}
          and{" "}
          <Link
            href="/TermsandConditions"
            className="text-[#f2931c] hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      <button
        onClick={acceptCookies}
        className="bg-[#f2931c] hover:bg-[#f2931c] text-white font-medium py-2 px-6 rounded text-sm sm:text-base"
      >
        Got it!
      </button>
    </div>
  );
};

export default CookieConsent;
