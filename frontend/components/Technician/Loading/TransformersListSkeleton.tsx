import React from 'react';

const TransformersListSkeleton = () => {
  return (
    <div>
      <div className="text-[#94918A] flex justify-between mb-4">
        <p>Location/Sensor ID</p>
        <p>Health</p>
        <div className="mr-8">Status</div>
      </div>
      {Array(5).fill(0).map((_, idx) => (
        <div key={idx} className="flex justify-between items-center my-4 ml-2 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 rounded-full h-6 w-6"></div>
            <div>
              <div className="bg-gray-200 h-4 w-24 mb-2"></div>
              <div className="bg-gray-200 h-3 w-16"></div>
            </div>
          </div>
          <div className="bg-gray-200 h-8 w-8 rounded-full"></div>
          <div className="bg-gray-200 h-8 w-16 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default TransformersListSkeleton;
