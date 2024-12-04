import React, { useState } from "react";

export type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  ticketPrice: number;
  availableSeats: number;
};

const Modal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  eventId,
  ticketPrice,
  availableSeats,
}) => {
  const [quantity, setQuantity] = useState(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [proof, setProof] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = quantity * ticketPrice;

  const handleSubmit = async () => {
    if (!proof) {
      alert("Please upload payment proof before proceeding.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/buy-ticket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // Replace with actual user ID
          eventId,
          qty: quantity,
          voucherCode, // Pass voucher code if applicable
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Ticket purchased successfully!");
        onClose();
      } else {
        alert(data.message || "Failed to purchase ticket.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while processing your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Purchase Ticket</h2>

        {/* Ticket Cart */}
        <div className="mb-6">
          <div className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-medium text-gray-700">Ticket</p>
              <p className="text-sm text-gray-500">Cat 1</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="px-2 py-1 text-gray-600 border rounded-md"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= availableSeats}
                className={`px-2 py-1 ${
                  quantity >= availableSeats
                    ? "bg-gray-300 cursor-not-allowed"
                    : "border"
                } rounded-md`}
              >
                +
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {availableSeats - quantity} Remaining
          </p>
        </div>

        {/* Total Price */}
        <div className="mb-6">
          <p className="font-medium text-gray-700">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>

        {/* Voucher Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Voucher Code (Optional)
          </label>
          <input
            type="text"
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Proof
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProof(e.target.files ? e.target.files[0] : null)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={quantity <= 0 || !proof || isSubmitting}
            className={`px-4 py-2 ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700"
            } text-white rounded-md`}
          >
            {isSubmitting ? "Processing..." : "Check Out"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
