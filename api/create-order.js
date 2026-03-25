const Razorpay = require("razorpay");

module.exports = async (req, res) => {
  try {
    console.log("ENV CHECK:");
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

    return res.status(200).json({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET ? "EXISTS" : "MISSING"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
