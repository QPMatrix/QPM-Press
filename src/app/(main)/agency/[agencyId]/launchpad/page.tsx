import BusinessDetailsStep from '@/components/lanchpad/business-details-step';
import Step from '@/components/lanchpad/step';
import StripeStep from '@/components/lanchpad/stripe-step';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Unauthorized from '@/components/unauthorized';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { getStripeOAuthLink } from '@/lib/utils';
import { CheckCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  params: { agencyId: string };
  searchParams: { code: string };
};

const LaunchPadPage = async ({ params, searchParams }: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  });
  if (!agencyDetails) return <Unauthorized />;
  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;
  const stripeOAuthLink = getStripeOAuthLink(
    'agency',
    `launchpad___${agencyDetails.id}`,
  );
  let connectedStripeAccount = false;
  if (searchParams.code) {
    if (!agencyDetails.connectAccountId) {
      try {
        const response = await stripe.oauth.token({
          grant_type: 'authorization_code',
          code: searchParams.code,
        });
        await db.agency.update({
          where: { id: params.agencyId },
          data: { connectAccountId: response.stripe_user_id },
        });
        connectedStripeAccount = true;
      } catch (error) {
        console.log('🔴 Could not connect stripe account');
      }
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Lets get started!</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Step
              imageSrc="/assets/appstore.png"
              description="Save the website as a shortcut on your mobile device"
              buttonText="Start"
            />
            <StripeStep
              agencyDetails={agencyDetails}
              connectedStripeAccount={connectedStripeAccount}
              stripeOAuthLink={stripeOAuthLink}
            />
            <Step
              imageSrc="/assets/paypal.png"
              description="Connect your paypal account to accept payments and see your dashboard."
              buttonText="Start"
            />
            <BusinessDetailsStep
              agencyDetails={agencyDetails}
              allDetailsExist={allDetailsExist}
              agencyId={params.agencyId}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;
