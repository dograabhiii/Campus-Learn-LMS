import React, { useState } from "react";
import { X, ShieldCheck, BadgeCheck, Clock3 } from "lucide-react";

const PaymentModal = ({ course, onclose, onPayment }) => {
  const [showPayment, setShowPayment] = useState(false);
  console.log("COURSE IN MODAL:", course);

  return (
    <div className="test fixed overflow-y-auto inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm top-0 px-4">
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl h-[800px]">
        
        {/* Close Button */}
        <button
          onClick={onclose}
          className="absolute right-5 top-0 z-10 rounded-full bg-gray-100 p-2 transition hover:bg-gray-200"
        >
          
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-2 ">
          
          {/* LEFT SIDE */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 p-8 text-white">
            
            {/* Course Image */}
            <img
              src={course?.image}
              alt="course"
              className="mb-6 h-[240px] w-full rounded-2xl object-cover"
            />

            {/* Course Title */}
            <h2 className="mb-3 text-3xl font-bold">
              {course?.title}
            </h2>

            {/* Description */}
            <p className="mb-6 text-sm leading-7 text-blue-100">
              {course?.description}
            </p>

            {/* Features */}
            <div className="space-y-4">
              
              <div className="flex items-center gap-3">
                <BadgeCheck className="text-green-300" />
                <p>Certificate of Completion</p>
              </div>

              <div className="flex items-center gap-3">
                <Clock3 className="text-yellow-300" />
                <p>Lifetime Access</p>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-cyan-300" />
                <p>Secure Payment Gateway</p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="p-8 ">
            
            {/* Heading */}
            <h2 className="mb-2 text-3xl font-bold text-gray-800">
              Complete Payment
            </h2>

            <p className="mb-8 text-gray-500">
              Unlock full course access after successful payment.
            </p>

            {/* Payment Methods */}
            <div className="space-y-4">
              
              {/* Razorpay */}
              <div className="flex cursor-pointer items-center justify-between rounded-2xl border-2 border-blue-600 bg-blue-50 p-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-blue-600 px-4 py-2 text-white font-semibold">
                    R
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Razorpay
                    </h3>
                    <p className="text-sm text-gray-500">
                      UPI, Cards, Wallets & Net Banking
                    </p>
                  </div>
                </div>

                <div className="h-5 w-5 rounded-full border-4 border-blue-600"></div>
              </div>

              {/* UPI */}
              <div className="flex cursor-pointer items-center justify-between rounded-2xl border p-4 hover:border-blue-400">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gray-100 px-4 py-2 font-semibold">
                    UPI
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      UPI Payment
                    </h3>
                    <p className="text-sm text-gray-500">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="flex cursor-pointer items-center justify-between rounded-2xl border p-4 hover:border-blue-400">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-gray-100 px-4 py-2 font-semibold">
                    💳
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Debit / Credit Card
                    </h3>
                    <p className="text-sm text-gray-500">
                      Visa, Mastercard, Rupay
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Price Section */}
            <div className="mt-8 rounded-2xl bg-gray-100 p-5">
              
              <div className="mb-3 flex items-center justify-between">
                <p className="text-gray-600">Course Price</p>
                <p className="font-semibold">₹ {course?.price}</p>
              </div>

              <div className="mb-3 flex items-center justify-between">
                <p className="text-gray-600">Platform Fee</p>
                <p className="font-semibold">₹ 0</p>
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-800">
                    Total Amount
                  </p>

                  <p className="text-2xl font-bold text-blue-700">
                    ₹ {course?.price}
                  </p>
                </div>
              </div>

            </div>

            {/* Pay Button */}
            <button
              onClick={onPayment}
              className="mt-8 w-full rounded-2xl bg-blue-700 py-4 text-lg font-semibold text-white transition hover:bg-blue-800"
            >
              Pay Securely ₹ {course?.price}
            </button>

            {/* Security Text */}
            <p className="mt-4 text-center text-sm text-gray-500">
              100% Secure Payment • SSL Encrypted
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;