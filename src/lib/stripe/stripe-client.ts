import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;
export const getStripe = (connectedAccountId: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '',
      {
        stripeAccount: connectedAccountId,
      },
    );
  }
  return stripePromise;
};
