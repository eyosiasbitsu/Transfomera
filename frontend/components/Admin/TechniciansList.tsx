import Image from "next/image";
import React from "react";
import technicianAvatar from "@/public/images/Technician/technicianAvatar.svg";

const TechniciansList = () => {
  const technicians = [
    {
      fullname: "Abebe Kebede",
    },
    {
      fullname: "Abebe Kebede",
    },
    {
      fullname: "Abebe Kebede",
    },
    {
      fullname: "Abebe Kebede",
    },
  ];
  return (
    <div className="w-[90%] border-t border-t-[#979CA5] pt-4 sm:w-9">
      <p className="text-2xl font-bold">Technicians</p>
      <div className="max-h-80 overflow-y-auto pr-2">
        {technicians.map((technician, idx) => {
          return (
            <div key={idx} className="bg-white flex gap-2 my-3 rounded-lg py-4">
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
  );
};

export default TechniciansList;
