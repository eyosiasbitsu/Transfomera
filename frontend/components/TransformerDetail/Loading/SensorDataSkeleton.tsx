import React from 'react';

// SensorDataSkeleton
const SensorDataSkeleton = () => {
  const skeletonItems = Array.from({ length: 5 });

  return (
    <div>
      <div className="text-[#94918A] flex justify-between">
        <p>Date</p>
        <p>Temperature(K)</p>
        <p>Current(A)</p>
        <p>Oil Level(L)</p>
      </div>
      {skeletonItems.map((_, idx) => (
        <div key={idx} className="flex justify-between items-center my-4 ml-2 animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>
        </div>
      ))}
    </div>
  );
};

export default SensorDataSkeleton;
