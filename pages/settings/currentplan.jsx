"use client";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";
import { BASE_URL } from "../../components/Constant/constant";
import { ResumeContext } from "../../components/context/ResumeContext";

export default function CurrentPlan() {
  const { t } = useTranslation();
  const [status, setStatus] = useState("Inactive");
  const [accountId, setAccountId] = useState();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { selectedLang } = useContext(ResumeContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError(t("account.unauthorized"));

          return;
        }

        const response = await axios.get(
          `${BASE_URL}/api/user/user-profile?lang=${selectedLang}`,
          {
            headers: { Authorization: token },
          }
        );

        if (response.data?.status === "success") {
          const userProfile = response.data.data; // Store response data in a variable
          setUserData(userProfile);
          setStatus(userProfile.is_active_plan ? "Active" : "Inactive");
        } else {
          setError(t("account.error"));
        }
      } catch (err) {
        setStatus("Inactive");
        console.error("Error fetching user profile:", err);
        setError(t("account.error"));
      } finally {
      }
    };

    fetchUserProfile();
  }, [selectedLang, t]);
  return (
    <>
      <div className="">
        {/* Subscription Details */}
        <div className="font-bold mb-6">
          <p className="">
            Current Plan:{" "}
            {userData?.plan_id ? (
              <span className="font-medium text-green-500">
                {userData.plan_id === 1 && "Free Plan"}
                {userData.plan_id === 2 && "Single Pass"}
                {userData.plan_id === 3 && "AI Pro Month"}
                {userData.plan_id === 4 && "AI Pro Yearly"}
              </span>
            ) : (
              "N/A"
            )}
          </p>
        </div>
      </div>
    </>
  );
}
