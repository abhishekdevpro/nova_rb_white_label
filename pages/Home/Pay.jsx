import PricingSection from "../../components/Pricing/PricingPlan";
import { useRouter } from "next/router";
function PaymentPlans() {
  const router = useRouter();

  // Fixed price

  return (
    <>
      <div className="  ">
        <section className=" ">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold  rounded-2xl text-white bg-gray-800 border p-3 border-gray">
                Choose a Plan, Which is right for you?
              </h2>
            </div>
            <PricingSection />
            <div className="text-center">
              <button
                className="rounded-full px-8 py-3 text-lg font-medium text-white bg-gray-800 rounded-xl hover:bg-gray-800 transition duration-300 "
                onClick={() => router.push("/pricing")}
              >
                View all plans
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default PaymentPlans;
