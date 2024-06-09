"use client";

import { useGetTransformerQuery } from "@/app/GlobalRedux/Features/transormers/transormersAPI";
import Image from "next/image";
import React from "react";
import CircularProgressBar from "../Technician/Home/CircularProgressBar";
import starIcon from "@/public/images/Technician/Star Icon.svg";
import SensorDataList from "./SensorDataList";
import TransformerDetailSkeleton from "./Loading/TransformerDetailSkeleton";
import { useRouter } from "next/navigation";
import registerIcon from "@/public/images/Technician/arrow-square-right.svg";

const TransformerDetail = ({ id }: { id: string }) => {
  const router = useRouter();
  const {
    data: transformerData,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetTransformerQuery(id);
  if (isSuccess) {
    console.log("trd", transformerData);
  }

  if (isLoading) {
    return <TransformerDetailSkeleton />;
  } else if (isError) {
    return <p className="text-red-700">Somethin went wrong!</p>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-8">
        <div>
          <p className="text-4xl mb-4">Transformera</p>
        </div>
        <div
          onClick={() => router.push("/register")}
          className="flex items-center gap-2 hover:cursor-pointer"
        >
          <p className="bg-[#EAD595] px-2 py-1 rounded-lg">
            Register a Transformer
          </p>
          <button>
            <Image src={registerIcon} alt="Register Icon" />
          </button>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex items-center gap-2">
          <Image src={starIcon} alt="Star Icon" />
          <div>
            <p className="font-semibold text-xl">
              {transformerData?.transformer.streetAddress}
              {", "}
              {transformerData?.transformer.city}
            </p>
            <p className="text-[#94918A] text-sm">
              {transformerData?.transformer.sensorId}
            </p>
          </div>
        </div>
        <CircularProgressBar
          percentage={Number(transformerData?.transformer.healthPercentile)}
        />
      </div>
      <p className="font-semibold text-lg my-4">Sensor Data</p>
      <SensorDataList id={id} />
    </div>
  );
};

export default TransformerDetail;
