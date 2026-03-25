import axios from "axios";

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, products } = req.body;

    console.log("Incoming:", req.body);

    const response = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/checkout/create",
      {
        amount: amount,
        currency: "INR",
        products: products,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SHIPROCKET_API_KEY}:${process.env.SHIPROCKET_API_SECRET}`,
        },
      }
    );

    console.log("Shiprocket:", response.data);

    return res.status(200).json({
      checkout_url: response.data.checkout_url,
    });

  } catch (error) {
    console.error("ERROR:", error.response?.data || error.message);

    return res.status(500).json({
      error: "Failed to create checkout",
      details: error.response?.data || error.message,
    });
  }
}
