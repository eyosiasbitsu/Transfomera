"use client";

import { useGetSensorDataQuery } from "@/app/GlobalRedux/Features/transormers/transormersAPI";
import React from "react";
import SensorDataSkeleton from "./Loading/SensorDataSkeleton";

const SensorDataList = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetSensorDataQuery(id);
  return (
    <div>
      {(isLoading || isFetching) && <SensorDataSkeleton />}
      {isError && (
        <p className="text-[#94918A] text-xl mt-10 w-fit mx-auto">
          Could not fetch transormers!
        </p>
      )}
      {isSuccess && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-2 border-b text-left">Date</th>
                <th className="py-2 px-2 border-b text-left">Temperature(K)</th>
                <th className="py-2 px-2 border-b text-left">Current(A)</th>
                <th className="py-2 px-2 border-b text-left">Oil Level(L)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((sensorData, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2 px-2 border-b">{sensorData.date}</td>
                  <td className="py-2 px-2 border-b">
                    {sensorData.temperature}
                  </td>
                  <td className="py-2 px-2 border-b">{sensorData.current}</td>
                  <td className="py-2 px-2 border-b">{sensorData.oilLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SensorDataList;
