import Image from "next/image";
import React from "react";
import technicianAvatar from "@/public/images/Technician/technicianAvatar.svg";
import { useGetAllTechniciansQuery } from "@/app/GlobalRedux/Features/auth/authApi";

const TechniciansList = () => {
  // const technicians = [
  //   {
  //     fullname: "Abebe Kebede",
  //   },
  //   {
  //     fullname: "Abebe Kebede",
  //   },
  //   {
  //     fullname: "Abebe Kebede",
  //   },
  //   {
  //     fullname: "Abebe Kebede",
  //   },
  // ];

  const {
    data: technicians,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetAllTechniciansQuery();


  if (isLoading) {
    return <p>Loading Technicians...</p>;
  } else if (isError) {
    return <p className="text-red-500">There is something wrong!</p>;
  } else if(isSuccess) {
    return (
      <>
        {technicians?.length === 0 && <p>No registered technicians!</p>}
        {technicians && (
          <div className="w-[90%] border-t border-t-[#979CA5] pt-4">
            <p className="text-2xl font-bold">Technicians</p>
            <div className="max-h-80 overflow-y-auto pr-2">
              {technicians.map((technician, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-white flex gap-2 my-3 rounded-lg py-4"
                  >
                    <Image src={technicianAvatar} alt="Technician Avatar" />
                    <div>
                      <p className="text-xl font-bold">{technician.fullname}</p>
                      <p>Senior Technician</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </>
    );
  }
};

export default TechniciansList;
