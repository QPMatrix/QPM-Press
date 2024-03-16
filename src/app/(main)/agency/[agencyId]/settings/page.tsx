import AgencyDetails from "@/components/form/agency-details";
import UserDetails from "@/components/form/user-details";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import React from "react";

type Props = {
  params: {
    agencyId: string;
  };
};

const SettingsPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  if (!authUser) return;
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser?.emailAddresses[0]?.emailAddress,
    },
  });
  if (!userDetails) return;
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return;
  const subAccounts = agencyDetails?.SubAccount;
  return (
    <div className="flex lg:!flex-row flex-col gap-4">
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type="agency"
        id={params.agencyId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default SettingsPage;
