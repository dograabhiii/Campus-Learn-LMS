import razorpay from "../config/razorpay.js";

export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // convert to paisa
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Order creation failed" });
  }
};

import crypto from "crypto";

export const verifyPayment = (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }

  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};