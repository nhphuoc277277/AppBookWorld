// import express from 'express';
// import Stripe from 'stripe';

// const stripe = new Stripe(
//   'sk_test_51LksFaBV28KdDJtDghRwcFhArVGvyu9jl05AZt3xHUOxY8C9FQ1NlIAZv7XxtQopv6pBDpZB3hYHVc7zGB13KNxS00BwXKTRh7',
//   {
//     apiVersion: '2022-08-01',
//     typescript: true,
//   },
// );
// const app = express();
// app.use(express.json());

// app.post('/create-payment-intent', async (req, res) => {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 3000,
//     currency: 'usd',
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// app.listen(3000, () => console.log('Server up'));

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys

const express = require('express');
const stripe = require('stripe')(
  'sk_test_51LksFaBV28KdDJtDghRwcFhArVGvyu9jl05AZt3xHUOxY8C9FQ1NlIAZv7XxtQopv6pBDpZB3hYHVc7zGB13KNxS00BwXKTRh7',
);

const PORT = 4000;

const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  console.log('LOG SERVER ', req.body);

  const payableAmount = parseInt(amount) * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payableAmount,
    currency: currency,
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log('Server up ', PORT);
});
