import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-10 md:p-20 pt-20 md:pt-32 h-screen ">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10" />

      <div className="md:w-1/2 space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white">
          About QubeFlow
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl dark:text-gray-300">
          QubeFlow, powered by QPMatrix, is more than just a website builder.
          It's a comprehensive solution designed to streamline the management of
          your agency. With QubeFlow, you can handle all the details and
          payments in one place, saving you time and effort. Our current
          provider is subdomain, but we're working on domain support in the next
          update. We're also leveraging the power of AI to enhance your
          experience and provide you with smart, efficient tools for managing
          your agency.
        </p>
        <Link
          href="http://www.qpmatrix.tech"
          className="text-primary dark:text-blue-400 mt-4"
        >
          Learn more about QPMatrix
        </Link>
      </div>
      <div className="md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
        <Image
          src={'/assets/QubeFlow-logo.svg'}
          alt="QPMatrix logo"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default AboutPage;
