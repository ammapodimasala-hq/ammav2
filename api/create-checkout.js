export default async function handler(req, res) {
  try {
    const { amount, products } = req.body;

    const response = await fetch(
      "https://apiv2.shiprocket.in/v1/external/checkout/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SHIPROCKET_API_KEY}:${process.env.SHIPROCKET_API_SECRET}`,
        },
        body: JSON.stringify({
          amount,
          currency: "INR",
          products,
        }),
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
}
