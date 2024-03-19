import BlurPage from "@/components/global/blur-page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Unauthorized from "@/components/unauthorized";
import { db } from "@/lib/db";
import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: { subaccountId: string };
  searchParams: { state: string; code: string };
};

const LaunchPadPage = async ({ params, searchParams }: Props) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });
  if (!subaccountDetails) return <Unauthorized />;
  const allDetailsExist =
    subaccountDetails.address &&
    subaccountDetails.address &&
    subaccountDetails.subAccountLogo &&
    subaccountDetails.city &&
    subaccountDetails.companyEmail &&
    subaccountDetails.companyPhone &&
    subaccountDetails.country &&
    subaccountDetails.name &&
    subaccountDetails.state &&
    subaccountDetails.zipCode;
  //WIP stripe
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
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                {/* WIP MAKE IT WORK */}
                <Image
                  src="/assets/appstore.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p> Save the website as a shortcut on your mobile device</p>
              </div>
              <Button>Start</Button>
            </div>
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
                  Connect your stripe account to accept payments and see your
                  dashboard.
                </p>
              </div>
              <Button>Start</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src="/assets/paypal.png"
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p>
                  Connect your paypal account to accept payments and see your
                  dashboard.
                </p>
              </div>
              <Button>Start</Button>
            </div>
            <div className="flex justify-between items-center w-full border p-4 rounded-lg gap-2">
              <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                <Image
                  src={subaccountDetails.subAccountLogo}
                  alt="app logo"
                  height={80}
                  width={80}
                  className="rounded-md object-contain"
                />
                <p> Fill in all your bussiness details</p>
              </div>
              {allDetailsExist ? (
                <CheckCircleIcon
                  size={50}
                  className="text-primary p-2 flex-shrink-0"
                />
              ) : (
                <Link
                  className="bg-primary py-2 px-4 rounded-md text-white"
                  href={`/agency/${params.subaccountId}/settings`}
                >
                  Start
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPadPage;
