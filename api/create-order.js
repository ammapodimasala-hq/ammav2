const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_SVb8lg207s9Fqr",       // paste fresh test key
      key_secret: "GPtBYjT8osQVlIVg06k7YstT"         // paste matching secret
    });

    const order = await instance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt_order_1"
    });

    return res.status(200).json(order);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
