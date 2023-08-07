
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.post('/procesar-pago', async (req, res) => {
  const { token, amount, currency } = req.body;

  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      source: token,
    });
    //Pago exitoso
    res.status(200).json({ success: true, charge });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
