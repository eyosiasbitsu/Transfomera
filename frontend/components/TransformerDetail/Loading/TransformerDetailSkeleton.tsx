import React from 'react';
import Image from 'next/image';
import starIcon from "@/public/images/Technician/Star Icon.svg";
import SensorDataSkeleton from './SensorDataSkeleton';

const CircularProgressBarSkeleton = () => (
    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
  );
  
  const TransformerDetailSkeleton = () => {
  return (
    <div className='py-4 px-8'>
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse">
        </div>
        <div className="flex flex-col">
          <div className="h-6 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
        </div>
        <div className="ml-auto">
          <CircularProgressBarSkeleton />
        </div>
      </div>
      <div className="mt-4">
        <SensorDataSkeleton />
      </div>
    </div>
  );
};

export default TransformerDetailSkeleton;
