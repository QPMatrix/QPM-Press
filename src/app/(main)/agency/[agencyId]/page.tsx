import React from "react";

interface Params {
  params: {
    agencyId: string;
  };
}

const Page = ({ params: { agencyId } }: Params) => {
  return <div>{agencyId}</div>;
};

export default Page;
