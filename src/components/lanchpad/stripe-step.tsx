import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Agency } from '@prisma/client';
type Props = {
  agencyDetails: Agency;
  connectedStripeAccount: boolean;
  stripeOAuthLink: string;
};

const StripeStep = ({
  agencyDetails,
  connectedStripeAccount,
  stripeOAuthLink,
}: Props) => {
  return (
    <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
      <div className="flex md:items-center gap-4 flex-col md:!flex-row">
        <Image
          src="/assets/stripelogo.png"
          alt="app logo"
          height={80}
          width={80}
          className="rounded-md object-contain"
        />
        <p>
          Connect your stripe account to accept payments and see your dashboard.
        </p>
      </div>
      {agencyDetails.connectAccountId || connectedStripeAccount ? (
        <CheckCircleIcon size={50} className="text-primary p-2 flex-shrink-0" />
      ) : (
        <Link
          className="bg-primary py-2 px-4 rounded-md text-white"
          href={stripeOAuthLink}
        >
          Start
        </Link>
      )}
    </div>
  );
};

export default StripeStep;
