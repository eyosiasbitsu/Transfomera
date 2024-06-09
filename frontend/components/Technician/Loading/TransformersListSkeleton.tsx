import React from 'react';

const TransformersListSkeleton = () => {
  const skeletonRows = Array(5).fill(0);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">Location/Sensor ID</th>
            <th className="py-2 px-4 border-b text-center">Health</th>
            <th className="py-2 px-4 border-b text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
                  <div>
                    <div className="w-48 h-5 bg-gray-200 animate-pulse mb-2"></div>
                    <div className="w-32 h-4 bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td className="py-2 px-4 border-b">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
              </td>
              <td className="py-2 px-4 border-b">
                <div className="w-24 h-8 bg-gray-200 rounded-md animate-pulse mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransformersListSkeleton;
