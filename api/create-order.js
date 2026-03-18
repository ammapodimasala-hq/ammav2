export default async function handler(req, res) {
  try {
    // Step 1: Get token
    const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
      })
    });

    const authData = await authRes.json();
    const token = authData.token;

    // Step 2: Get order data from frontend
    const order = req.body;

    // Step 3: Create order in Shiprocket
    const orderRes = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        order_id: order.order_id,
        order_date: new Date().toISOString().slice(0, 10),
        pickup_location: "Primary",
        billing_customer_name: order.name,
        billing_last_name: "",
        billing_address: order.address,
        billing_city: order.city,
        billing_pincode: order.pincode,
        billing_state: order.state,
        billing_country: "India",
        billing_email: order.email,
        billing_phone: order.phone,
        shipping_is_billing: true,
        order_items: [
          {
            name: order.product,
            sku: "sku1",
            units: 1,
            selling_price: order.price
          }
        ],
        payment_method: "Prepaid",
        sub_total: order.price,
        length: 10,
        breadth: 10,
        height: 10,
        weight: 0.5
      })
    });

    const result = await orderRes.json();

    res.status(200).json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
