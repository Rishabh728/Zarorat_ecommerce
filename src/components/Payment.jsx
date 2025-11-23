import React, { useState } from "react";

const Payment = () => {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // UPI
  const [upiId, setUpiId] = useState("");

  // Netbanking
  const [bank, setBank] = useState("");

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Complete Your Payment
        </h2>

        {!success ? (
          <>
            {/* Payment Method Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { key: "card", label: "Card" },
                { key: "upi", label: "UPI" },
                { key: "netbanking", label: "NetBanking" },
                { key: "wallet", label: "Wallet" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setMethod(item.key)}
                  className={`p-2 rounded border text-sm ${
                    method === item.key
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Card Payment */}
            {method === "card" && (
              <div>
                <label>Card Number</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />

                <label>Expiry Date</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />

                <label>CVV</label>
                <input
                  type="password"
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            )}

            {/* UPI */}
            {method === "upi" && (
              <div>
                <label>UPI ID</label>
                <input
                  type="text"
                  className="w-full border p-2 mb-3 rounded"
                  placeholder="yourname@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {/* Net Banking */}
            {method === "netbanking" && (
              <div>
                <label>Select Bank</label>
                <select
                  className="w-full border p-2 mb-3 rounded"
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                >
                  <option value="">Choose Bank</option>
                  <option value="SBI">State Bank of India</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="AXIS">Axis Bank</option>
                </select>
              </div>
            )}

            {/* Wallet */}
            {method === "wallet" && (
              <div>
                <label>Select Wallet</label>
                <select className="w-full border p-2 mb-3 rounded">
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                </select>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-red-500 text-white p-3 rounded mt-2"
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </>
        ) : (
          <div className="text-center p-5">
            <h3 className="text-green-600 text-2xl font-semibold">
              Payment Successful!
            </h3>
            <p className="mt-2">Thank you for your order.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default  React.memo(Payment);
