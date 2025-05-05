import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../components/Constant/constant";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../components/utils/axiosInstance";
import { toast } from "react-toastify";

function Subscriberslist1() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { i18n, t } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BASE_URL}/api/admin/subscribes`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Ensure response.data.data is an array before setting state
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Failed to load users.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUnsubscribe = async (email) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.put(
        `/api/user/user-unsubscribe?lang=${language}`,
        { email }
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        // }
      );

      // Show the success message from API
      toast.success(response.data.message);

      // Update the user subscription status after unsubscribing
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, is_subscribe: 0 } : user
        )
      );
    } catch (error) {
      console.error("Error unsubscribing user:", error);
      toast.error(
        error.response?.data?.message || "Failed to unsubscribe user."
      );
    }
  };
  const handleSubscribe = async (email) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axiosInstance.put(
        `/api/user/user-resubscribe?lang=${language}`,
        { email }
      );

      // Show the success message from API
      toast.success(response.data.message);

      // Update the user subscription status after unsubscribing
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, is_subscribe: 0 } : user
        )
      );
    } catch (error) {
      console.error("Error unsubscribing user:", error);
      toast.error(
        error.response?.data?.message || "Failed to unsubscribe user."
      );
    }
  };
  if (loading) {
    return (
      <div className="text-center py-4">
        {t("admin.subscriberlist.loading")}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        {t("admin.subscriberlist.error")}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-center">
      <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-start text-3xl text-white font-bold">
          {t("admin.subscriberlist.subscriberList")}
        </h2>
      </div>
      <div className="overflow-x-auto">
        {users.length === 0 ? (
          <p className="text-lg text-gray-500">
            {t("admin.subscriberlist.noData")}
          </p>
        ) : (
          <table className="min-w-full bg-dark text-black rounded-md text-center">
            <thead>
              <tr className="bg-pink-500 text-white">
                <th className="py-2 px-4">
                  {t("admin.subscriberlist.createdAt")}
                </th>
                <th className="py-2 px-4">{t("admin.subscriberlist.email")}</th>
                <th className="py-2 px-4">
                  {t("admin.subscriberlist.status")}
                </th>
                <th className="py-2 px-4">
                  {t("admin.subscriberlist.action")}
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-700 text-center"
                >
                  <td className="py-2 px-4">{user.created_at || "N/A"}</td>
                  <td className="py-2 px-4">{user.email || "N/A"}</td>
                  <td className="py-2 px-4">
                    {/* <button
                      className={`border px-8 rounded-3xl py-2 ${
                        user.is_subscribe === 1 ? "bg-blue-700" : "bg-red-700"
                      } text-white`}
                    >
                      {user.is_subscribe === 1
                        ? t("admin.subscriberlist.subscribed")
                        : t("admin.subscriberlist.notSubscribed")}
                    </button> */}
                    <button
                      className={`border px-8 rounded-3xl py-2 ${
                        user.is_subscribe === 1 ? "bg-blue-700" : "bg-red-700"
                      } text-white`}
                      onClick={() => {
                        if (user.is_subscribe === 0) {
                          handleSubscribe(user.email); // call API if user is NOT subscribed
                        }
                      }}
                    >
                      {user.is_subscribe === 1
                        ? t("admin.subscriberlist.subscribed")
                        : t("admin.subscriberlist.notSubscribed")}
                    </button>
                  </td>
                  <td className="py-2 px-4">
                    {user.is_subscribe === 1 && (
                      <button
                        onClick={() => handleUnsubscribe(user.email)}
                        className="bg-red-500 text-white px-4 py-2 rounded-3xl"
                      >
                        {t("admin.subscriberlist.unsubscribe")}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Subscriberslist1;
