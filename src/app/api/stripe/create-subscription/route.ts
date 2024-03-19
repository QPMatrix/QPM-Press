import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { customerId, priceId } = await req.json();
  if (!customerId || !priceId) {
    return new NextResponse('Missing required fields', { status: 400 });
  }
  const subscriptionExits = await db.agency.findFirst({
    where: { customerId },
    include: { Subscription: true },
  });
  try {
    if (
      subscriptionExits?.Subscription?.subscriptionId &&
      subscriptionExits?.Subscription?.active
    ) {
      //updated the subscription instead of creating a new one
      if (!subscriptionExits?.Subscription?.subscriptionId) {
        return new Error('Subscription not found');
      }
      console.log('Updating subscription');
      const currentSubscriptionDetails = await stripe.subscriptions.retrieve(
        subscriptionExits?.Subscription?.subscriptionId,
      );
      const subscription = await stripe.subscriptions.update(
        subscriptionExits?.Subscription?.subscriptionId,
        {
          items: [
            {
              id: currentSubscriptionDetails.items.data[0].id,
              deleted: true,
            },
            {
              price: priceId,
            },
          ],
          expand: ['latest_invoice.payment_intent'],
        },
      );
      return NextResponse.json({
        subscriptionId: subscription.id,
        //@ts-ignore
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } else {
      console.log('Creating new subscription');
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
          },
        ],
        payment_behavior: 'default_incomplete',
        payment_settings: {
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
      });
      return NextResponse.json({
        subscriptionId: subscription.id,
        //@ts-ignore
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    }
  } catch (error) {
    console.log('Error creating subscription', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
