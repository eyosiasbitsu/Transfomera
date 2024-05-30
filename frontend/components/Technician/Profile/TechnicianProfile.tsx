"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import registerIcon from "@/public/images/Technician/arrow-square-right.svg";
import starIcon from "@/public/images/Technician/Star Icon.svg";
import userAvatar from "@/public/images/Technician/Avatar.svg";
import CircularProgressBar from "../Home/CircularProgressBar";
import PasswordAndSecurity from "./PasswordAndSecurity";
import Logout from "../Logout";
import { useGetTechnicianTransformersQuery } from "@/app/GlobalRedux/Features/transormers/transormersAPI";
import TransformersListSkeleton from "../Loading/TransformersListSkeleton";
import { User } from "@/Types/User";
import { skipToken } from "@reduxjs/toolkit/query";

const TechnicianProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);
    setUser(storedUser);
  }, []);
   
  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetTechnicianTransformersQuery(user ? user._id : skipToken);
  // const transformers = [
  //   {
  //     _id: {
  //       $oid: "6640f4567346080342c3d2ee",
  //     },
  //     city: "addis00",
  //     location: "Piassa, AX-02",
  //     status: "Needs fix",
  //     sensorId: "1",
  //     healthPercentile: 65,
  //     installationDate: {
  //       $date: "2024-05-12T16:54:46.419Z",
  //     },
  //     assignedTechnician: null,
  //     registeredBy: {
  //       $oid: "663fc502148644a7ed96271b",
  //     },
  //     sensorData: [],
  //     __v: 12,
  //   },
  //   {
  //     _id: {
  //       $oid: "6640f4567346080342c3d2ee",
  //     },
  //     city: "addis00",
  //     location: "Piassa, AX-02",
  //     status: "Needs fix",
  //     sensorId: "1",
  //     healthPercentile: 65,
  //     installationDate: {
  //       $date: "2024-05-12T16:54:46.419Z",
  //     },
  //     assignedTechnician: null,
  //     registeredBy: {
  //       $oid: "663fc502148644a7ed96271b",
  //     },
  //     sensorData: [],
  //     __v: 12,
  //   },
  //   {
  //     _id: {
  //       $oid: "6640f4567346080342c3d2ee",
  //     },
  //     city: "addis00",
  //     location: "Piassa, AX-02",
  //     status: "Needs fix",
  //     sensorId: "1",
  //     healthPercentile: 65,
  //     installationDate: {
  //       $date: "2024-05-12T16:54:46.419Z",
  //     },
  //     assignedTechnician: null,
  //     registeredBy: {
  //       $oid: "663fc502148644a7ed96271b",
  //     },
  //     sensorData: [],
  //     __v: 12,
  //   },
  // ];
    
  
  return (
    <div className="flex gap-8 mt-8 ml-4">
      <div className="w-[70%]">
        <div className="flex justify-between">
          <div>
            <p className="text-4xl mb-4">Transformera</p>
            <p>Welcome</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="bg-[#EAD595] px-2 py-1 rounded-lg">
              Register a Transformer
            </p>
            <button>
              <Image src={registerIcon} alt="Register Icon" />
            </button>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold my-4">Transformers</p>
        </div>
        {(isLoading || isFetching) && <TransformersListSkeleton />}
        {isError && <p className="text-[#94918A] text-xl mt-10 w-fit mx-auto">
                Could not fetch transormers!
              </p>}
        {isSuccess && (
          
          <>
            <div className="text-[#94918A] flex justify-between">
              <p>Location/Sensor ID</p>
              <p>Health</p>
              <div className="mr-8">Status</div>
            </div>
            {data.transformer.length === 0 && (
              <p className="text-[#94918A] text-xl mt-10 w-fit mx-auto">
                You have not registered transformers yet!
              </p>
            )}
            {data.transformer.length > 0 &&
              data.transformer.map((transformerData, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex justify-between items-center my-4 ml-2"
                  >
                    <div className="flex items-center gap-2">
                      <Image src={starIcon} alt="Star Icon" />
                      <div>
                        <p className="font-bold text-lg">
                          {transformerData.location}
                        </p>
                        <p className="text-[#94918A] text-sm">
                          {transformerData.sensorId}
                        </p>
                      </div>
                    </div>
                    <CircularProgressBar
                      percentage={Number(transformerData.healthPercentile)}
                    />
                    <p className="font-semibold text-sm bg-[#F6EFD8] px-6 py-2 rounded-md">
                      {transformerData.status}
                    </p>
                  </div>
                );
              })}
          </>
        )}
      </div>
      <div className="w-[30%] bg-[#F6F2DD] flex flex-col items-center gap-4 pb-20">
        <div className="flex flex-col gap-2">
          <Image src={userAvatar} alt="User Avatar" />
          <p className="text-2xl font-bold">{user ? user.fullname: "_____"}</p>
          <p className="text-[#979CA5]">Senior Technician</p>
          <Logout />
        </div>
        <PasswordAndSecurity userId={user? user._id: ""} />
      </div>
    </div>
  );
};

export default TechnicianProfile;
