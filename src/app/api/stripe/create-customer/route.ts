import { stripe } from '@/lib/stripe';
import { StripeCustomerType } from '@/lib/types';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const { address, email, name, shipping }: StripeCustomerType =
    await req.json();
  if (!email || !name || !address || !shipping) {
    return new NextResponse('Missing required fields', { status: 400 });
  }
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      address,
      shipping,
    });
    return NextResponse.json({ customerId: customer.id });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal server error', { status: 500 });
  }
};
