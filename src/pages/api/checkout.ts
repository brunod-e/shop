import { ProductType } from '@/context/CartContext';
import { stripe } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { products } = req.body as { products: ProductType[] };

  if (req.method !== 'POST') {
    return res.status(405).json('Method not allowed');
  }

  if (!products) {
    return res.status(400).json({ error: 'Missing products' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: products.map((product) => ({
      price: product.defaultPriceId,
      quantity: 1,
    })),
  });

  return res.status(201).json({ checkoutUrl: checkoutSession.url });
};

export default handler;
