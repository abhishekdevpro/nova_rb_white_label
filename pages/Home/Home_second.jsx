import { useState } from "react";
import axios from "axios";
import React from "react";
import Home_third from "./Home_third";
import Link from "next/link";
import PaymentPlans from "./Pay";
function Home_second() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Fixed price

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handlePayment = (e) => {
    e.preventDefault();
    const amount = 9.85;

    // const payload = {
    //   amount,
    //   ResumeId: "9CN06189KH259320999",
    //   Name: name,
    //   Email: email,
    //   Phone: phone,
    // };

    // axios
    //   .post(
    //     "https://apiwl.novajobs.us/api/user/paypal/create-payment",
    //     payload,
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    //   .then((response) => {
    //     const data = response.data;
    //     if (data && data.data) {
    //       // Redirect to the PayPal URL provided in the response
    //       window.location.href = data.data;
    //     }
    //   })
    //   .catch((error) => console.error("Payment Error:", error));

    handleCloseModal(); // Close the modal after submitting the form
  };

  const [showModal1, setShowModal1] = useState(false);
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [phone1, setPhone1] = useState("");
  // Fixed price

  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const handlePayment1 = (e) => {
    e.preventDefault();
    const amount = 29;

    // const payload = {
    //   amount,
    //   ResumeId: "9CN06189KH259320999",
    //   Name: name1,
    //   Email: email1,
    //   Phone: phone1,
    // };

    // axios
    //   .post(
    //     "https://apiwl.novajobs.us/api/user/paypal/create-payment",
    //     payload,
    //     {
    //       headers: { "Content-Type": "application/json" },
    //     }
    //   )
    //   .then((response) => {
    //     const data = response.data;
    //     if (data && data.data) {
    //       // Redirect to the PayPal URL provided in the response
    //       window.location.href = data.data;
    //     }
    //   })
    //   .catch((error) => console.error("Payment Error:", error));

    handleCloseModal1(); // Close the modal after submitting the form
  };

  return (
    <>
      <div className="  ">
        <section className="bg-gray-800 dark:bg-blue-200">
          <PaymentPlans />
        </section>
      </div>

      <Home_third />
    </>
  );
}

export default Home_second;
