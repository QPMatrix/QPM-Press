import { Agency, SubAccount } from '@prisma/client';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

type Props = {
  agencyDetails?: Agency;
  allDetailsExist: string;
  agencyId?: string;
  subaccountDetails?: SubAccount;
  subaccountId?: string;
};

const BusinessDetailsStep = ({
  agencyDetails,
  allDetailsExist,
  agencyId,
  subaccountDetails,
  subaccountId,
}: Props) => {
  const logo =
    agencyDetails?.agencyLogo ||
    subaccountDetails?.subAccountLogo ||
    '/assets/QubeFlow-logo.svg';
  const link = agencyId
    ? `/agency/${agencyId}/settings`
    : `/subaccount/${subaccountId}/settings`;

  return (
    <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
      <div className="flex md:items-center gap-4 flex-col md:!flex-row">
        <Image
          src={logo}
          alt="app logo"
          height={80}
          width={80}
          className="rounded-md object-contain"
        />
        <p> Fill in all your business details</p>
      </div>
      {allDetailsExist ? (
        <CheckCircleIcon size={50} className="text-primary p-2 flex-shrink-0" />
      ) : (
        <Link
          className="bg-primary py-2 px-4 rounded-md text-white"
          href={link}
        >
          Start
        </Link>
      )}
    </div>
  );
};

export default BusinessDetailsStep;
