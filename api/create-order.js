export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ success: false, error: "Invalid method" });
  }

  try {
    // SAFE BODY PARSE
    let data = req.body;
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    console.log("BODY:", data);

    // AUTH
    const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: process.env.SR_EMAIL,
        password: process.env.SR_PASSWORD
      })
    });

    const authData = await authRes.json();
    console.log("AUTH:", authData);

    if (!authData.token) {
      return res.status(200).json({
        success: false,
        error: authData
      });
    }

    const token = authData.token;

    // CREATE ORDER
    const orderRes = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        order_id: "ORDER_" + Date.now(),
        order_date: new Date(),
        pickup_location: "Primary",
        billing_customer_name: data.name,
        billing_address: data.address,
        billing_city: data.city,
        billing_pincode: data.pincode,
        billing_state: "Maharashtra",
        billing_country: "India",
        billing_phone: data.phone,
        shipping_is_billing: true,
        order_items: data.items,
        payment_method: "Prepaid",
        sub_total: data.items.reduce((a, i) => a + i.units * i.selling_price, 0)
      })
    });

    const orderData = await orderRes.json();
    console.log("ORDER:", orderData);

    return res.status(200).json({
      success: orderData.status === 1,
      orderData
    });

  } catch (err) {
    console.error("CRASH:", err);

    return res.status(200).json({
      success: false,
      error: err.message || "Server crash"
    });
  }
}
