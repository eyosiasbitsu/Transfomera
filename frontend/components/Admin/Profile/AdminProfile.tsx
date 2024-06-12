"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import registerIcon from "@/public/images/Technician/arrow-square-right.svg";
import starIcon from "@/public/images/Technician/Star Icon.svg";
import userAvatar from "@/public/images/Technician/Avatar.svg";
import CircularProgressBar from "@/components/Technician/Home/CircularProgressBar";
import PasswordAndSecurity from "@/components/auth/PasswordAndSecurity";
import Logout from "@/components/auth/Logout";
import { useGetTechnicianTransformersQuery } from "@/app/GlobalRedux/Features/transormers/transormersAPI";
import TransformersListSkeleton from "@/components/Technician/Loading/TransformersListSkeleton";
import { User } from "@/Types/User";
import { skipToken } from "@reduxjs/toolkit/query";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userT") as string);
    setUser(storedUser);
  }, []);

  const { data, isLoading, isFetching, isError, isSuccess } =
    useGetTechnicianTransformersQuery(user ? user._id : skipToken);

  return (
    <div className="flex gap-8 mt-8 ml-4">
      <div className="w-[70%]">
        <div className="flex justify-between">
          <div>
            <p className="text-4xl mb-4">Transformera</p>
            <p>Welcome</p>
          </div>
          <div
            onClick={() => router.push("/techniciansignup")}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <p className="bg-[#EAD595] px-2 py-1 rounded-lg">
              Register a Technician
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
        {isError && (
          <p className="text-[#94918A] text-xl mt-10 w-fit mx-auto">
            Could not fetch transormers!
          </p>
        )}
        {isSuccess && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="py-2 px-4 border-b">Location/Sensor ID</th>
                  <th className="py-2 px-4 border-b">Health</th>
                  <th className="py-2 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.transformer.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-[#94918A] py-4">
                      You have not registered transformers yet!
                    </td>
                  </tr>
                ) : (
                  data.transformer.map((transformerData, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">
                        <Link
                          href={`/transformer/${transformerData._id}`}
                          className="flex items-center gap-2"
                        >
                          <Image src={starIcon} alt="Star Icon" />
                          <div>
                            <p className="font-bold text-lg">
                              {transformerData.streetAddress},{" "}
                              {transformerData.city}
                            </p>
                            <p className="text-[#94918A] text-sm">
                              {transformerData.sensorId}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-2 px-4 border-b">
                        <CircularProgressBar
                          percentage={Number(transformerData.healthPercentile)}
                        />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <p className="font-semibold text-sm bg-[#F6EFD8] px-6 py-2 rounded-md">
                          {transformerData.status}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="w-[30%] bg-[#F6F2DD] flex flex-col items-center gap-4 pb-20">
        <div className="flex flex-col gap-2">
          <Image src={userAvatar} alt="User Avatar" />
          <p className="text-2xl font-bold">{user ? user.fullname : "_____"}</p>
          <p className="text-[#979CA5]">Senior Technician</p>
          <Logout />
        </div>
        <PasswordAndSecurity userId={user ? user._id : ""} />
      </div>
    </div>
  );
};

export default AdminProfile;
