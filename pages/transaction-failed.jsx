import Link from "next/link";
export default function FailedPage() {
  return (
    <>
      <div className="text-center my-5 mx-auto">
        <h1>💲Transactions</h1>

        <p className="my-5" style={{ fontSize: "40px" }}>
          ❌ Your Payment is Failed❗❗
        </p>
        <Link href="/payment">
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg bottom-btns"
            // style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Try Again
          </button>
        </Link>
      </div>
    </>
  );
}
