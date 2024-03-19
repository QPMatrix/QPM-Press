import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: { subaccountId: string };
};

const PipeLine = async ({ params }: Props) => {
  const pipeLinesExists = await db.pipeline.findFirst({
    where: { subAccountId: params.subaccountId },
  });
  if (pipeLinesExists) {
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${pipeLinesExists.id}`,
    );
  }
  try {
    const response = await db.pipeline.create({
      data: {
        name: 'First Pipeline',
        subAccountId: params.subaccountId,
      },
    });
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${response.id}`,
    );
  } catch (error) {
    console.log(error);
  }
};

export default PipeLine;
