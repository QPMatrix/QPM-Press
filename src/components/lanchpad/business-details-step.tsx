import { Agency } from '@prisma/client';
import { CheckCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
type Props = {
  agencyDetails: Agency;
  allDetailsExist: any;
  agencyId: string;
};

const BusinessDetailsStep = ({
  agencyDetails,
  allDetailsExist,
  agencyId,
}: Props) => {
  return (
    <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
      <div className="flex md:items-center gap-4 flex-col md:!flex-row">
        <Image
          src={agencyDetails.agencyLogo}
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
          href={`/agency/${agencyId}/settings`}
        >
          Start
        </Link>
      )}
    </div>
  );
};

export default BusinessDetailsStep;
