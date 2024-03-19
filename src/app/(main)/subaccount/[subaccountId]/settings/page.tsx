import SubAccountDetails from '@/components/form/subaccount-details';
import UserDetails from '@/components/form/user-details';
import Unauthorized from '@/components/unauthorized';
import { db } from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import React from 'react';

type Props = {
  params: { subaccountId: string };
};

const SettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) {
    return <Unauthorized />;
  }
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) {
    return <Unauthorized />;
  }
  const subAccount = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });
  if (!subAccount || !subAccount.agencyId) return;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: subAccount.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return;
  const subAccounts = agencyDetails.SubAccount;
  return (
    <div className="flex lg:!flex-row flex-col gap-4">
      <SubAccountDetails
        agencyDetails={agencyDetails}
        details={subAccount}
        userId={userDetails?.id}
        userName={userDetails?.name}
      />
      <UserDetails
        type="subaccount"
        id={params.subaccountId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default SettingsPage;
