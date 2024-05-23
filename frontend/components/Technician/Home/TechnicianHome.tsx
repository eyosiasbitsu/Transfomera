import Image from "next/image";
import React from "react";
import registerIcon from "@/public/images/Technician/arrow-square-right.svg";
import starIcon from "@/public/images/Technician/Star Icon.svg";
import ProgressCircle from "./CircularProgressBar";
import CircularProgressBar from "./CircularProgressBar";

const TechnicianHome = () => {
  const transformers = [
    {
      _id: {
        $oid: "6640f4567346080342c3d2ee",
      },
      city: "addis00",
      location: "Piassa, AX-02",
      status: "Needs fix",
      sensorId: "1",
      healthPercentile: 65,
      installationDate: {
        $date: "2024-05-12T16:54:46.419Z",
      },
      assignedTechnician: null,
      registeredBy: {
        $oid: "663fc502148644a7ed96271b",
      },
      sensorData: [],
      __v: 12,
    },
    {
      _id: {
        $oid: "6640f4567346080342c3d2ee",
      },
      city: "addis00",
      location: "Piassa, AX-02",
      status: "Needs fix",
      sensorId: "1",
      healthPercentile: 65,
      installationDate: {
        $date: "2024-05-12T16:54:46.419Z",
      },
      assignedTechnician: null,
      registeredBy: {
        $oid: "663fc502148644a7ed96271b",
      },
      sensorData: [],
      __v: 12,
    },
    {
      _id: {
        $oid: "6640f4567346080342c3d2ee",
      },
      city: "addis00",
      location: "Piassa, AX-02",
      status: "Needs fix",
      sensorId: "1",
      healthPercentile: 65,
      installationDate: {
        $date: "2024-05-12T16:54:46.419Z",
      },
      assignedTechnician: null,
      registeredBy: {
        $oid: "663fc502148644a7ed96271b",
      },
      sensorData: [],
      __v: 12,
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p className="text-3xl mb-4">Transformera</p>
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
      <div className="text-[#94918A] flex justify-between">
        <p>Location/Sensor ID</p>
        <p>Health</p>
        <p>Status</p>
      </div>
      {transformers.map((transformerData) => {
        return (
          <div className="flex justify-between items-center my-4">
            <div className="flex items-start gap-2">
              <Image src={starIcon} alt="Star Icon" />
              <div>
                <p className="font-bold text-lg">{transformerData.location}</p>
                <p className="text-[#94918A] text-sm">
                  {transformerData.sensorId}
                </p>
              </div>
            </div>
            <CircularProgressBar
              percentage={transformerData.healthPercentile}
            />
            <p>{transformerData.status}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TechnicianHome;
