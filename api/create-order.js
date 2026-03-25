const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  return res.status(200).json({
    KEY_ID: process.env.RAZORPAY_KEY_ID || "MISSING",
    KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? "EXISTS" : "MISSING"
  });
};;
