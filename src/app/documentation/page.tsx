import React from 'react';
import Image from 'next/image';

const DocPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Under Progress</h1>
      <Image
        src="/assets/under_progress.svg"
        alt="Under Progress"
        width={200}
        height={200}
      />
    </div>
  );
};

export default DocPage;
