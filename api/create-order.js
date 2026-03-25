const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  const instance = new Razorpay({
    key_id: "rzp_test_xxx", // paste directly
    key_secret: "xxxxxx"
  });

  const order = await instance.orders.create({
    amount: 50000,
    currency: "INR"
  });

  res.status(200).json(order);
};
