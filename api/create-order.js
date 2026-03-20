export default async function handler(req, res) {
  try {
    const data = req.body;

    // 1. Authenticate with Shiprocket
    const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: process.env.pratiknj2901@gmail.com,
        password: process.env.Pratik@sr1
      })
    });

    const authData = await authRes.json();
    const token = authData.token;

    // 2. Create Order in Shiprocket
    const orderRes = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        order_id: "ORDER_" + Date.now(),
        order_date: new Date(),
        billing_customer_name: data.name,
        billing_address: data.address,
        billing_city: data.city,
        billing_pincode: data.pincode,
        billing_phone: data.phone,
        order_items: data.items,
        payment_method: "Prepaid"
      })
    });

    const orderData = await orderRes.json();

    return res.status(200).json({ success: true, orderData });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
