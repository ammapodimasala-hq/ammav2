
export default async function handler(req, res) {
  const response = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: process.env.ammapodimasala@gmail.com,
      password: process.env.uy!MkIGF3pUnphe*q8v&@wQTwKil&mes
    })
  });

  const data = await response.json();

  res.status(200).json(data);
}
