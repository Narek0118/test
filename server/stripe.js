const Router = require("express");
const router = new Router();
const stripe = require("stripe")(
  "sk_test_51MrODGFbJ598qtQWA3zyMcQyJpmwRYW8053VaxmC7V0MIHgzSovI20EfK2FyhFpdSM10FXmgIpTokNubSWHfGWQI005Cab2yVi"
);

router.post("/create-checkout-session", async (req, res) => {
  console.log(2323324324324, req.body);
  const { price } = req.body.cartItems;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "amd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.DOMAIN}/checkout-success`,
    cancel_url: `${process.env.DOMAIN}/checkout`,
  });
  console.log(33333333, session);
  res.send({ url: session.url });
});

module.exports = router;
