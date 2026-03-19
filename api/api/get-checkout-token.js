export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { order_items, sub_total, discount, 
          shipping_charges, total } = req.body;

  try {
    // Get Shiprocket auth token
    const authRes = await fetch(
      'https://apiv2.shiprocket.in/v1/external/auth/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email:    process.env.SR_EMAIL,
          password: process.env.SR_PASSWORD
        })
      }
    );
    const authData = await authRes.json();
    
    if (!authData.token) {
      return res.status(401).json({ error: 'Shiprocket auth failed' });
    }

    // Create checkout session
    const checkoutRes = await fetch(
      'https://apiv2.shiprocket.in/v1/external/checkout/session',
      {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${authData.token}`
        },
        body: JSON.stringify({
          checkout_key:        process.env.SR_CHECKOUT_KEY,
          checkout_secret:     process.env.SR_CHECKOUT_SECRET,
          channel_id:          process.env.SR_CHANNEL_ID,
          order_items,
          sub_total,
          discount,
          shipping_charges,
          giftwrap_charges:    0,
          transaction_charges: 0,
          total,
          currency:            'INR'
        })
      }
    );

    const data = await checkoutRes.json();

    if (!data.token) {
      console.error('Checkout session error:', data);
      return res.status(500).json({ error: 'Could not create session' });
    }

    return res.status(200).json({ token: data.token });

  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
}
