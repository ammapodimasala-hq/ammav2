const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  try {
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);

    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await instance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt_order_1",
    });

    return res.status(200).json(order);

  } catch (err) {
    console.error("ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
};
