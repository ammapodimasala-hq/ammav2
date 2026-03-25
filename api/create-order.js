import Razorpay from "razorpay";

export default async function handler(req, res) {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const options = {
      amount: 50000, // ₹500 in paise
      currency: "INR",
      receipt: "receipt_order_1",
    };

    const order = await instance.orders.create(options);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
}
