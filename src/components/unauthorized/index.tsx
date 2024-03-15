import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const Unauthorized = (props: Props) => {
  return (
    <div className="p-4 text-center h-screen w-screen flex justify-center items-center flex-col">
      <Image
        src="/assets/unauthorized.svg"
        alt="unauthorized"
        width={200}
        height={200}
      />
      <h1 className="text-3xl md:text-6xl">Unauthorized access!</h1>
      <p>Please contact support or your agency owner to get access</p>
      <Link href="/" className="mt-4 bg-primary p-2">
        Back to home
      </Link>
    </div>
  );
};

export default Unauthorized;
